const assert = require('assert');
const { Given, When, Then } = require('cucumber');

const Guest = require('../../../class_definitions/guest');

Given('I have a guest', function () {
  this.guest = new Guest();
});

When('I set the name to {string}', function (string) {
 this.guest.name=string;
});

Then('the guest name is {string}', function (string) {
  assert(this.guest.name === string);
});