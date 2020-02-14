# restaurant
Restaurant (Team Bald Eagle)

## Warning:

This project is currently not functional, the dev-dependency `request` is no longer maintained. The code will need a rewrite for this project to be functional again. I do not recommend using this code as-is.

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
