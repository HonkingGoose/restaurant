# restaurant
Restaurant (Team Bald Eagle)

## Pre-requisites

- MySQL is installed, and you have a root account for MySQL.
- NodeJS and NPM are installed.
- VSCode/Atom with ESLint plugin installed.

## How to get started:

- `$ git clone` this repo.
- `$ npm install`
- Create database by importing the MySQL dump:
`$ mysql -u root -p <./files/database_setup.sql`

## Running the controller:

- `$ node src/backend/api.js`

## Running tests

- First ensure the controller is running.
- `$ npm test`
