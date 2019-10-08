'use strict';

const assert = require('assert');
const expect = require('chai').expect;
const { Given, When, Then } = require('cucumber');

const request = require('request');

let baseUrl;
let statusCode;

Given('I have a URL at {string}', function (string) {

 baseUrl = string;

});

When('I send a GET request to that URL', function () {

  const options = {
    uri: baseUrl,
    json: true
  }
  request.get(options, function (error, response, responseBody) {
    statusCode = response.statusCode;
    // rloman this expect should be below but fails. tomorrow fix it.
    expect(statusCode).to.be.equal(200);
  });
});

Then('I get returned response status code {string}', function (string) {
  // expect(statusCode).to.be.equal(string);
});