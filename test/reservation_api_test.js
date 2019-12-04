'use strict'

const expect = require('chai').expect
const request = require('request')
const faker = require('faker/locale/nl')

const port = 3000

const baseUrl = 'http://localhost:' + port + '/api/reservations'

let id // for later storing an id in between to tests

// Mocking configuration
const reservationDate = faker.date.future()
const start_time = '12:00'
const hideMenuPrice = faker.random.number({ min: 0, max: 1 }) // or faker.random.boolean() if a boolean is needed
const numberOfGuests = faker.random.number({ min: 1, max: 100 })
const specialNeeds = faker.hacker.phrase()
const allergyList = [
  'egg',
  'gluten',
  'lupin',
  'milk',
  'mustard',
  'nuts',
  'peanuts',
  'crustaceans',
  'sulphite',
  'celery',
  'sesame',
  'molluscs',
  'fish',
  'soya']
const randomAllergyFromList = allergyList[Math.floor(Math.random() * allergyList.length)]
const fullName = faker.name.findName()
const telephoneNumber = faker.helpers.replaceSymbolWithNumber('06#########')
const telephoneNumberWithScore = faker.helpers.replaceSymbolWithNumber('06-#########')

// Fixture setup
const randomFixture = {
  reservation_date: reservationDate,
  start_time: '12:00',
  hide_menu_price: hideMenuPrice,
  number_of_guests: numberOfGuests,
  allergy: randomAllergyFromList,
  special_needs: specialNeeds,
  fullName: fullName,
  telephone: telephoneNumber
}

describe('Reservation API tests:', function () {
  describe('POST', function () {
    it('with available date and time should create a reservation')
    it('with not available date and time in future, should return a error message')
    it('with date in the past should return a error message ')
    it('OPTIONAL: with telephone number with score should also work')
  })
  describe('GET', function () {
    it('should return a response body', function (done) {
      const options = {
        uri: baseUrl,
        json: true
      }
      request.get(options, function (error, response, responseBody) {
        if (error) done(error)
        else {
          expect(responseBody.length).to.be.greaterThan(0)
        }
      })
    })
    it('should return status code 200', function (done) {
      const options = {
        uri: baseUrl,
        json: true
      }
      request.get(options, function (error, response, responseBody) {
        if (error) done(error)
        else {
          expect(response.statusCode).to.be.equal(200)
        }
      })
    })
    it('/api/reservations/ should return a list of reservations')
    it('/api/reservations/:id should return a reservation with id: id')
    // remember to add :id to base url!
    it('/api/reservations/-1 should return status code 404')
    // remember to add :id to base url!
  })
  describe('PUT', function () {
    it('/api/reservations/id should modify a reservation')
    it('/api/reservations/-1 should return status code 404')
  })
  describe('DELETE', function () {
    it('/api/reservations should delete the just created reservation')
    it('/api/reservations/-1 should return status code 404')
  })
})
