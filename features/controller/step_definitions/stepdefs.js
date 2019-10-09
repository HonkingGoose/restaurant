'use strict';

const expect = require('chai').expect;
const { Given, When, Then } = require('cucumber');

const request = require('request');

let hostname;
let port;
let baseUrl;
let options;

Given('I have a server at {string} on port {int}', function (string, int) {
  hostname = string;
  port=int;
});

Given('I have a URL at {string}', function (string) {
  baseUrl = string;
});

When('I send a GET request to that URL', function () {
  options = {
    uri: `http://${hostname}:${port}/${baseUrl}`,
    json: true
  }
})

Then('I get returned response status code {string}', function (string) {
  request.get(options, function (error, response, responseBody) {
    if (error) {
      console.log(error);
    }
    expect(response.statusCode).to.be.equal(200);
  });
});