﻿# Bitespeed-Backend-Task-Identity-Reconciliation

## Description
Bitespeed-Backend-Task-Identity-Reconciliation is a web service designed to identify and keep track of a customer's identity across multiple purchases. It uses a relational database table named `Contact` to store customer contact information.

## Requirements
The web service provides an endpoint `/identify` that receives HTTP POST requests with a JSON body containing either an `email` or a `phoneNumber`. The service consolidates the contact information and returns a JSON response with the following format:

```json
{
  "contact": {
    "primaryContactId": number,
    "emails": string[],
    "phoneNumbers": string[],
    "secondaryContactIds": number[]
  }
}
```

If there are no existing contacts for the given request, the service creates a new `Contact` row and treats it as a new customer, returning an empty array for `secondaryContactIds`. Primary contacts can turn into secondary contacts if there are matching contacts with different emails or phone numbers.

## Stack Used
- Database: MySQL
- Backend Framework: Node.js

## API Documentation
The API documentation can be accessed through Swagger UI [here](https://bitespeed-backend-task-identity-ziz1.onrender.com/api-docs/).
## Docker Details
Build Docker Images 
```
docker build -t node-app -f Dockerfile .
docker build -t mysql-db -f Dockerfile.mysql .
```

Create a Docker Network

```
docker network create my-network

```

Run Docker Containers
```
docker run -d --name mysql-container --network my-network -e MYSQL_ROOT_PASSWORD=11111 -e MYSQL_DATABASE=fluxkart mysql-db
docker run -d --name node-container --network my-network -p 3000:3000 node-app
```



## Examples

### Example Request Body
```json
{
  "email": "mcfly@hillvalley.edu",
  "phoneNumber": "123456"
}
```

### Example Response Body
```json
{
  "contact": {
    "primaryContactId": 1,
    "emails": ["lorraine@hillvalley.edu", "mcfly@hillvalley.edu"],
    "phoneNumbers": ["123456"],
    "secondaryContactIds": [23]
  }
}
```

### Example Database State
#### Contacts Table
| id  | phoneNumber | email                     | linkedId | linkPrecedence | createdAt                  | updatedAt                  | deletedAt |
| --- | ----------- | ------------------------- | -------- | -------------- | -------------------------- | -------------------------- | --------- |
| 1   | 123456      | lorraine@hillvalley.edu   | null     | primary        | 2023-04-01 00:00:00.374+00 | 2023-04-01 00:00:00.374+00 | null      |
| 23  | 123456      | mcfly@hillvalley.edu      | 1        | secondary      | 2023-04-20 05:30:00.11+00  | 2023-04-20 05:30:00.11+00  | null      |

In the above example, the customer with the email "mcfly@hillvalley.edu" and phone number "123456" placed two orders. The first contact with email "lorraine@hillvalley.edu" is treated as the primary contact, and the second contact with email "mcfly@hillvalley.edu" is linked to the primary contact. The primary contact ID is 1, and the secondary contact ID is 23.

## Getting Started

### Hosted Link
The web service is currently hosted on [here](https://bitespeed-backend-task-identity-ziz1.onrender.com/).

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

### Contact Information
For any inquiries or issues, please contact at abhinavdixit2306@gmail.com.

### Additional Resources
- [Abhinav Dixit Resume](https://drive.google.com/file/d/1pEMMLybNPP2d9dsD1axMCygpW0Hkadvq/view?usp=sharing)
