[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=HonkingGoose/restaurant)](https://dependabot.com)

# restaurant

## Warning:

This project is currently **not working** because it's being rewritten.

## Where to find the latest release?

The latest release will always be found on the `release/<highest number>` branch.

## Where can I find the code as it was at the end of the learning track?

This code is on the `release/1` branch.

## What workflow must be used?

We use this workflow:

- Use feature branches for all new features and bug fixes.
- Merge feature branches into `master` using pull requests.
- Keep a high quality, up-to-date `master` branch.

A new release will go on the `release/` branch.
The release number must be incremented by 1.

Bug fixes/hotfixes made to a `release` that are also needed in `master` must be cherry picked from that `release` on a new feature branch from `master`.
The `release` branch is **never** merged back into `master`.

## Pre-requisites

- MySQL with root access.
- NodeJS and NPM.
- VSCode/Atom with ESLint plugin.

## How to get started:

- `$ git clone` this repository.
- `$ npm install`
- Create the database by importing the MySQL dump:
`$ mysql -u root -p <./files/database_setup.sql`

## Running the controller:

- `$ node src/backend/api.js`

## Running tests

- Make sure the controller is running.
- Run `$ npm test`
