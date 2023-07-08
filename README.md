﻿# Bitespeed-Backend-Task-Identity-Reconciliation

## Description
Bitespeed-Backend-Task-Identity-Reconciliation is a project for BE task assigned.

## Getting Started

### Hosted link
Use the following link to access it: [here](https://bitespeed-backend-task-identity-ziz1.onrender.com/api-docs/)


### Prerequisites
- Node.js (>=16.14)
- MySQL database

### Installation
1. Clone the repository: `git clone https://github.com/highonranking/bitespeed-BE.git`
2. Install dependencies: `npm install`
3. Set up environment variables:
   - Create a `.env` file in the root directory of the project
   - Add the following variables to the `.env` file:
     ```
     DB_HOST=[your_mysql_host]
     DB_USER=[your_mysql_user]
     DB_PASSWORD=[your_mysql_password]
     DB_NAME=[your_mysql_database]
     PORT=[your_server_port]
     ```
4. Set up the MySQL database:
   - Create a new database with the name specified in the `DB_NAME` environment variable

### Usage
- Start the server: `npm start`
- Access the Swagger UI: `https://bitespeed-backend-task-identity-ziz1.onrender.com/api-docs/`

### API Documentation
The API documentation is available through Swagger UI. Use the following link to access it: [https://bitespeed-backend-task-identity-ziz1.onrender.com/api-docs/](here)

### Examples
- Example request body:
```
{
"email": "john@example.com",
"phoneNumber": "+1234567890"
}
```

- Example response body:
```
{
"contact": {
"primaryContactId": 1,
"emails": ["john@example.com"],
"phoneNumbers": ["+1234567890"],
"secondaryContactIds": []
}
}

```

### Contact Information
For any inquiries or issues, please contact at abhinavdixit2306@gmail.com.

### Additional Resources
- [Abhinav Dixit Resume](https://drive.google.com/file/d/1pEMMLybNPP2d9dsD1axMCygpW0Hkadvq/view?usp=sharing)



