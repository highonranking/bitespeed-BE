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
const { check, validationResult } = require('express-validator');

app.post(
  '/identify',
  [
    check('email').optional().isEmail(),
    check('phoneNumber').optional().isMobilePhone(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Rest of the code
  }
);


app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
