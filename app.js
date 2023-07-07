const express = require('express');
const dotenv = require('dotenv');
const { check, validationResult } = require('express-validator');
const ContactController = require('./controllers/ContactController');

dotenv.config();

const app = express();
app.use(express.json());

// Endpoint for identifying and consolidating contacts
app.post(
  '/identify',
  [
    check('email').optional().isEmail(),
    check('phoneNumber').optional().isMobilePhone(),
  ],
  ContactController.identify
);

// Start the server
app.listen(process.env.PORT || 3000, () => {
  console.log('Server listening on port 3000');
});
