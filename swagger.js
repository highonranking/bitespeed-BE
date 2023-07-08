const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = 3001; // Change the port number if needed
app.listen(port, () => {
  console.log(`Swagger UI is available at http://localhost:${port}/api-docs`);
});
