## Table of Contents
 1. [About The Project](#about)
 2. [Built With](#built-with)
 3. [Scripts](#scripts)
 4. [Usage](#usage)
 5. [Contact](#contact)

## About The Project<a id='about'></a>

This is the second project for Udacity's advanced web nanodegree.

## Built With<a id='built-with'></a>

**This project** is built with:
  1. <a href="https://www.typescriptlang.org/">TypeScript</a>
  2. <a href="https://nodejs.org/en/">NodeJS</a>
  3. <a href="">Express</a>
  4. <a href="https://www.npmjs.com/package/bcrypt">Bcrypt</a>
  5. <a href="">Jasmine</a>
  6. <a href="">Supertest</a>
  7. <a href="">Eslint</a>
  8. <a href="">Prettier</a>
  9. <a href="">Nodemon</a>
  10. <a href="">PostgreSQL</a>
  11. <a href="">db-migrate</a>
  12. <a href="">Dotenv</a>
  13. <a href="">Jsonwebtoken</a>

  
  ## Scripts<a id='scripts'></a>
  - To install the required dependencies: `npm install`
  - To compile typescript to javascript: `npm run build`
  - To use ESLint on the typescript files: `npm run lint`
  - To use Prettier on the typescript files: `npm run prettier`  
  - To use jasmine and supertest for testing: `npm run test`
  - To start the server at http://127.0.0.1:3000: `npm run start`
  
## Usage <a id='usage'></a>
First of all add a `.env` File in the root directory and set the missing parameters

`POSTGRES_HOST = 127.0.0.1
POSTGRES_DB = store_front_backend
POSTGRES_TEST_DB = store_front_backend_test
POSTGRES_USER = ?????
POSTGRES_PASSWORD = ?????
NODE_ENV = dev
SALT_ROUNDS = 10
TOKEN_PRIVATE_KEY = x@AxcvS5569@gafd$`

then add a database.json file in the root directory and set the missing paramters

`{
    "dev": {
      "driver": "pg",
      "host": "127.0.0.1",
      "database": "store_front_backend",
      "user": "?????",
      "password": "?????"
    },
    "test": {
        "driver": "pg",
        "host": "127.0.0.1",
        "database": "store_front_backend_test",
        "user": "?????",
        "password": "?????"
      }
  }`

- To start the server at http://127.0.0.1:3000: `npm run start`
