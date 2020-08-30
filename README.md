

# e-commerce-helper

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

### Powered By 
[![Node: JS](https://img.shields.io/badge/Node-JS-cfcc00.svg)](https://nodejs.org/en/) [![Express: JS](https://img.shields.io/badge/Express-JS-1b9e00.svg)](https://nodejs.org/en/)
[![npm: mysql2](https://img.shields.io/badge/npm-mysql2-111AFF.svg)](https://github.com/sidorares/node-mysql2) [![npm: bcrypt](https://img.shields.io/badge/npm-bcrypt-6517D7.svg)](https://github.com/kelektiv/node.bcrypt.js)  [![npm: Sequelize](https://img.shields.io/badge/npm-Sequelize-00688a.svg)](https://github.com/sequelize/sequelize) [![Database: MySQL](https://img.shields.io/badge/Database-MySQL-111AFF.svg)](https://downloads.mysql.com/archives/community/) [![npm: dotenv](https://img.shields.io/badge/npm-dotenv-001a80.svg)](https://github.com/motdotla/dotenv) [![Operation: CRUDeholder](https://img.shields.io/badge/Operation-CRUD-red.svg)](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete)

## Description 

Back-end example solution which could connect to a front end code base for an e-commerce platform

## Table of Contents
* [Installation](#Installation)
* [Usage](#Usage)
* [Credits](#Credits)
* [Contribute](#Contribute)
* [License](#License)
* [Questions](#Questions)

## Installation

1) Begin by cloning the repo
* ```git clone <this repo ssh or https link pasted here>```
2) Change directory (```cd```) into the repo directory and then install the dependencies
* ```npm install```
3) Create the .env file into the root directory of the project
* ```touch .env```
4) Open this .env file and adjust your environment variables in this file for your MySQL configurations like this example
* ```js script
  DB_NAME='ecommerce_db'
  DB_USER='root'
  DB_PW='your MySQL password goes here!'
5) Navigate to the db/ folder with your shell and log into your MySQL local server and run the schema.sql file
* ```mysql -u root -p```
* ```source schema.sql```
6) If the schema file runs with no warnings or errors then navigate back to the root directory and run this next command in your shell to populate the database tables with data to work with.
* ```npm run seed```
7) If the seed command runs with no errors then you're good to start the local node instance with this command (sequelize will create the tables and columns based on the schema file and seeded data!)
* ```npm start```

* ...
* This project was developed using ***insomnia core*** to test the api endpoints for all of the different requests for CRUD operations. Since there is not front-end code-base to create, update, or delete data inside the database. You can only really read data from inside a web browser for now.
* All data is being sent and received as formatted JSON data.

## Usage
- video coming soon
- Check out the walkthrough video here by clicking this badge! 👇
* [![You: Tube](https://img.shields.io/badge/You-Tube-ff0000.svg)]()

## Credits

* Anders Ackerman
* Xandromus

## Contribute

If you would like to contribute please submit a pull request with any changes. And if a bug is discovered please open an issue about it. Thanks 👍

## License

e-commerce-helper is licensed under the MIT license.

## Questions

If anybody has any questions please reach out to the creator of the project - Anders Ackerman via:
* Email: anders.swedishviking@gmail.com
* GitHub: (https://github.com/dj-viking)
