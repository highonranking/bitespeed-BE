const mysql = require('mysql2');
const { validationResult } = require('express-validator');
require('dotenv').config();


const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;

// Use the variables in your database connection configuration
const pool = mysql.createPool({
  connectionLimit: process.env.DB_CONNECTION_LIMIT || 10,
  host: host,
  user: user,
  password: password,
  database: database,
});

class ContactController {
  static identify(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, phoneNumber } = req.body;

    // Checking if either email or phoneNumber is provided
    if (!email && !phoneNumber) {
      return res
        .status(400)
        .json({ error: 'At least one of email or phoneNumber must be provided' });
    }

    // Checking if a contact exists with the provided phone number
    const query = `
      SELECT * FROM contacts
      WHERE phoneNumber = ?
      ORDER BY createdAt ASC
    `;
    pool.query(query, [phoneNumber], (error, results) => {
      if (error) {
        console.error('Error executing MySQL query:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (results.length === 0) {
        // No existing contacts found, create a new primary contact
        const newContact = {
          phoneNumber,
          email,
          linkedId: null,
          linkPrecedence: 'primary',
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        pool.query('INSERT INTO contacts SET ?', newContact, (insertError, insertResults) => {
          if (insertError) {
            console.error('Error inserting new contact:', insertError);
            return res.status(500).json({ error: 'Internal server error' });
          }

          const { insertId } = insertResults;
          const consolidatedContact = {
            primaryContactId: insertId,
            emails: [email],
            phoneNumbers: [phoneNumber],
            secondaryContactIds: [],
          };

          return res.status(200).json({ contact: consolidatedContact });
        });
      } else {
        // Existing contacts found
        const matchingContact = results.find((contact) => contact.email === email);

        if (matchingContact) {
          // Contact with the provided email already exists, update the contact if necessary
          const updateQuery = 'UPDATE contacts SET phoneNumber = ? WHERE id = ?';
          pool.query(updateQuery, [phoneNumber, matchingContact.id], (updateError) => {
            if (updateError) {
              console.error('Error updating contact:', updateError);
              return res.status(500).json({ error: 'Internal server error' });
            }

            const consolidatedContact = {
              primaryContactId: matchingContact.id,
              emails: [email, ...results.map((contact) => contact.email).filter((e) => e !== email)],
              phoneNumbers: [phoneNumber, ...results.map((contact) => contact.phoneNumber).filter((p) => p !== phoneNumber)],
              secondaryContactIds: results
                .filter((contact) => contact.email !== email)
                .map((contact) => contact.id),
            };

            return res.status(200).json({ contact: consolidatedContact });
          });
        } else {
          const matchingContactByEmail = results.find((contact) => contact.email === email);

          if (matchingContactByEmail) {
            // Contact with the provided email already exists, create a new secondary contact
            const newContact = {
              phoneNumber,
              email,
              linkedId: matchingContactByEmail.id,
              linkPrecedence: 'secondary',
              createdAt: new Date(),
              updatedAt: new Date(),
            };

            pool.query('INSERT INTO contacts SET ?', newContact, (insertError, insertResults) => {
              if (insertError) {
                console.error('Error inserting new contact:', insertError);
                return res.status(500).json({ error: 'Internal server error' });
              }

              const { insertId } = insertResults;

              const consolidatedContact = {
                primaryContactId: matchingContactByEmail.id,
                emails: [email, ...results.map((contact) => contact.email).filter((e) => e !== email)],
                phoneNumbers: [phoneNumber, ...results.map((contact) => contact.phoneNumber)],
                secondaryContactIds: [...results.map((contact) => contact.id), insertId],
              };

              return res.status(200).json({ contact: consolidatedContact });
            });
          } else {
            const matchingContactByPhoneNumber = results.find((contact) => contact.phoneNumber === phoneNumber);

            if (matchingContactByPhoneNumber) {
              // Contact with the provided phone number already exists, create a new secondary contact
              const newContact = {
                phoneNumber,
                email,
                linkedId: matchingContactByPhoneNumber.id,
                linkPrecedence: 'secondary',
                createdAt: new Date(),
                updatedAt: new Date(),
              };

              pool.query('INSERT INTO contacts SET ?', newContact, (insertError, insertResults) => {
                if (insertError) {
                  console.error('Error inserting new contact:', insertError);
                  return res.status(500).json({ error: 'Internal server error' });
                }

                const { insertId } = insertResults;

                const consolidatedContact = {
                  primaryContactId: matchingContactByPhoneNumber.id,
                  emails: [email, ...results.map((contact) => contact.email)],
                  phoneNumbers: [phoneNumber, ...results.map((contact) => contact.phoneNumber).filter((p) => p !== phoneNumber)],
                  secondaryContactIds: [...results.map((contact) => contact.id), insertId],
                };

                return res.status(200).json({ contact: consolidatedContact });
              });
            } else {
              // No contact with the provided email or phone number found, create a new primary contact
              const newContact = {
                phoneNumber,
                email,
                linkedId: null,
                linkPrecedence: 'primary',
                createdAt: new Date(),
                updatedAt: new Date(),
              };

              pool.query('INSERT INTO contacts SET ?', newContact, (insertError, insertResults) => {
                if (insertError) {
                  console.error('Error inserting new contact:', insertError);
                  return res.status(500).json({ error: 'Internal server error' });
                }

                const { insertId } = insertResults;
                const consolidatedContact = {
                  primaryContactId: insertId,
                  emails: [email],
                  phoneNumbers: [phoneNumber],
                  secondaryContactIds: [],
                };

                return res.status(200).json({ contact: consolidatedContact });
              });
            }
          }
        }
      }
    });
  }
}

module.exports = ContactController;
