const express = require('express');
const dotenv = require('dotenv');
const { check, validationResult } = require('express-validator');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
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

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
