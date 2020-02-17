"use strict";

const expect = require("chai").expect;
const request = require("request");
const faker = require("faker/locale/nl");

const PORT = 8080;

const baseUrl = "http://localhost:" + port + "/api/reservations";

let id; // for later storing an id in between tests

// Mocking configuration
const reservationDate = faker.date.future();
const reservationDateHistory = faker.date.past();
const startTimeHistory = reservationDate;
const startTime = reservationDate;
const hideMenuPrice = faker.random.number({ min: 0, max: 1 }); // or faker.random.boolean() if a boolean is needed
const numberOfGuests = faker.random.number({ min: 1, max: 100 });
const specialNeeds = "TESTDATA " + faker.hacker.phrase();
const allergyList = [
  "egg",
  "gluten",
  "lupin",
  "milk",
  "mustard",
  "nuts",
  "peanuts",
  "crustaceans",
  "sulphite",
  "celery",
  "sesame",
  "molluscs",
  "fish",
  "soya",
  ""
];
const randomAllergyFromList =
  allergyList[Math.floor(Math.random() * allergyList.length)];
const fullName = faker.name.firstName() + " " + faker.name.lastName();
const telephoneNumber = faker.helpers.replaceSymbolWithNumber("06#########");

// Fixture setup
// Convert the Faker reservationDate from a object to a String with format yyyy-mm-dd
// Convert the Faker reservationDate from a object to a String with format hh:mm:ss
const fixture = {
  reservation_date: reservationDate.toISOString().split("T")[0],
  start_time: startTime
    .toISOString()
    .split("T")[1]
    .split(".")[0],
  hide_menu_price: hideMenuPrice,
  number_of_guests: numberOfGuests,
  allergy: randomAllergyFromList,
  special_needs: specialNeeds,
  fullName: fullName,
  telephone: telephoneNumber
};

const fixturePast = {
  reservation_date: reservationDateHistory.toISOString().split("T")[0],
  start_time: startTimeHistory
    .toISOString()
    .split("T")[1]
    .split(".")[0],
  hide_menu_price: hideMenuPrice,
  number_of_guests: numberOfGuests,
  allergy: randomAllergyFromList,
  special_needs: specialNeeds,
  fullName: fullName,
  telephone: telephoneNumber
};

describe("Reservation API tests:", function() {
  describe("POST", function() {
    it("Create a reservation with no regards to availability", function(done) {
      const options = {
        uri: baseUrl,
        json: fixture
      };
      request.post(options, function(error, response, responseBody) {
        if (error) done(error);
        else {
          expect(responseBody.reservationDate).to.equal(
            fixture.reservationDate
          );
          expect(responseBody.start_time).to.equal(fixture.start_time);
          expect(responseBody.hide_menu_price).to.be.equal(
            fixture.hide_menu_price
          );
          expect(responseBody.number_of_guests).to.be.equal(
            fixture.number_of_guests
          );
          expect(responseBody.allergy).to.be.equal(fixture.allergy);
          expect(responseBody.special_needs).to.be.equal(fixture.special_needs);
          expect(responseBody.fullName).to.be.equal(fixture.fullName);
          expect(responseBody.telephone).to.be.equal(fixture.telephone);
          expect(response.statusCode).to.be.equal(201);
          id = +responseBody.id;
          expect(id).to.be.greaterThan(0);
          done();
        }
      });
    });
    it("Create reservation where fullName is a number, should return statuscode 400", function(done) {
      const numberReservation = fixture;
      numberReservation.fullName = 1;
      numberReservation.special_needs = "TESTDATA NUMBER IN FULLNAME";
      const options = {
        uri: baseUrl,
        json: numberReservation
      };
      request.post(options, function(error, response, responseBody) {
        if (error) done(error);
        else {
          expect(response.statusCode).to.be.equal(400);
          done();
        }
      });
    });
    it(
      "with not available date and time in future, should return a error message"
    );
    it("with date in the past should return a error message ", function(done) {
      const options = {
        uri: baseUrl,
        json: fixturePast
      };
      fixturePast.special_needs = "TESTDATA DATE IN PAST";
      request.post(options, function(error, response) {
        if (error) done(error);
        else {
          expect(response.statusCode).to.be.equal(404);
          done();
        }
      });
    });
  });
  describe("GET", function() {
    it(baseUrl + " should return a list", function(done) {
      const options = {
        uri: baseUrl,
        json: true
      };
      request.get(options, function(error, response, responseBody) {
        if (error) done(error);
        else {
          expect(responseBody.length).to.be.greaterThan(0);
          expect(response.statusCode).to.be.equal(200);
          done();
        }
      });
    });
    it(baseUrl + "/:id should return a reservation with id: id", function(
      done
    ) {
      const options = {
        uri: `${baseUrl}/${id}`,
        json: true
      };
      request.get(options, function(error, response, responseBody) {
        if (error) done(error);
        else {
          expect(responseBody).to.include({ id: id });
          expect(responseBody.id).to.be.equal(id);
          expect(response.statusCode).to.be.equal(200);
          done();
        }
      });
    });
    it(baseUrl + "/-1 should return status code 404", function(done) {
      const options = {
        uri: `${baseUrl}/${-1}`,
        json: true
      };
      request.get(options, function(error, response, responseBody) {
        if (error) done(error);
        else {
          expect(response.statusCode).to.be.equal(404);
          done();
        }
      });
    });
  });
  describe("PUT", function() {
    it(baseUrl + "/:id should modify a reservation", function(done) {
      const updateReservation = fixture;
      updateReservation.special_needs = "TESTDATA PUT " + faker.hacker.phrase();
      const options = {
        uri: `${baseUrl}/${id}`,
        json: updateReservation
      };
      request.put(options, function(error, response, responseBody) {
        if (error) done(error);
        else {
          expect(response.statusCode).to.be.equal(202);
          expect(responseBody).to.include({ id: id });
          expect(responseBody).to.include({
            special_needs: updateReservation.special_needs
          });
          done();
        }
      });
    });
    it(baseUrl + "/-1 should return status code 404", function(done) {
      const options = {
        uri: `${baseUrl}/${-1}`,
        json: true
      };
      request.put(options, function(error, response, responseBody) {
        if (error) done(error);
        else {
          expect(response.statusCode).to.be.equal(404);
          done();
        }
      });
    });
  });
  describe("DELETE", function() {
    it(baseUrl + "/:id should delete the just created reservation", function(
      done
    ) {
      const options = {
        uri: `${baseUrl}/${id}`,
        json: true
      };
      request.delete(options, function(error, response, responseBody) {
        if (error) done(error);
        else {
          expect(response.statusCode).to.be.equal(204);
        }
        // Try to GET the reservation that was just deleted, this should return status code 404
        request.get(options, function(error, response, responseBody) {
          if (error) done(error);
          else {
            expect(response.statusCode).to.be.equal(404);
            done();
          }
        });
      });
    });
    it(baseUrl + "/-1 should return status code 404", function(done) {
      const options = {
        uri: `${baseUrl}/${-1}`,
        json: true
      };
      request.delete(options, function(error, response, responseBody) {
        if (error) done(error);
        else {
          expect(response.statusCode).to.be.equal(404);
          done();
        }
      });
    });
  });
});
