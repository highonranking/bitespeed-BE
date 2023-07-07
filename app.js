// app.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
// app.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'fluxkart_user',
  password: '11111',
  database: 'fluxkart',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// app.js
app.post('/identify', (req, res) => {
  const { email, phoneNumber } = req.body;

  // Checking if either email or phoneNumber is provided
  if (!email && !phoneNumber) {
    return res.status(400).json({ error: 'At least one of email or phoneNumber must be provided' });
  }

  // TODO: Add contact identification and consolidation logic

  res.status(200).json({ message: 'Identification successful' });
});


app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
