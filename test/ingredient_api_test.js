"use strict";

const expect = require("chai").expect;
const request = require("request");

const port = 3000;

const baseUrl = "http://localhost:" + port + "/api/ingredients";

let id; // for later storing an id in between to tests

describe("Ingredients API tests:", function() {
  it("POST should create a ingredient", function(done) {
    const fixture = {
      name: "APItestinput",
      allergen: "APItestinput",
      unit_of_measurement: "APItestinput",
      amount_in_stock: 99.99
    };
    const options = {
      uri: baseUrl,
      json: fixture
    };
    request.post(options, function(error, response, responseBody) {
      if (error) {
        done(error);
      } else {
        expect(responseBody.affectedRows).to.be.equal(1);
        done();
      }
    });
  });
  it("GET should return a reponse body", function(done) {
    const options = {
      uri: baseUrl,
      json: true
    };
    request.get(options, function(error, response, responseBody) {
      if (error) {
        done(error);
      } else {
        // eslint-disable-next-line no-unused-expressions
        expect(responseBody).to.be.not.null;
        const list = responseBody;
        const size = list.length;
        const lastElement = list[size - 1];
        id = lastElement.id;
        done();
      }
    });
  });
  it("GET should return status code 200", function(done) {
    const options = {
      uri: baseUrl,
      json: true
    };
    request.get(options, function(error, response, responseBody) {
      if (error) {
        done(error);
      } else {
        expect(response.statusCode).to.equal(200);
        done();
      }
    });
  });
  it("GET " + baseUrl + "/:id should return a customer with id: id", function(
    done
  ) {
    const fixture = {
      name: "APItestinput",
      allergen: "APItestinput",
      unit_of_measurement: "APItestinput",
      amount_in_stock: 99.99
    };
    const options = {
      uri: `${baseUrl}/${id}`,
      json: true
    };
    request.get(options, function(error, response, responseBody) {
      if (error) {
        done(error);
      } else {
        expect(responseBody.name).to.equal(fixture.name);
        expect(responseBody.allergen).to.equal(fixture.allergen);
        expect(responseBody.unit_of_measurement).to.equal(
          fixture.unit_of_measurement
        );
        expect(responseBody.amount_in_stock).to.equal(fixture.amount_in_stock);
        expect(response.statusCode).to.equal(200);
        done();
      }
    });
  });
  it("GET " + baseUrl + "/-1 should return status code 404", function(done) {
    const options = {
      uri: `${baseUrl}/-1`,
      json: true
    };
    request.get(options, function(error, response, responseBody) {
      if (error) {
        done(error);
      } else {
        expect(response.statusCode).to.equal(404);
        done();
      }
    });
  });
  it("PUT " + baseUrl + "/id should modify a ingredient", function(done) {
    const fixture = {
      name: "APItestinputmodify",
      allergen: "APItestinputmodify",
      unit_of_measurement: "APItestinputmodify",
      amount_in_stock: 299.99
    };
    const options = {
      uri: `${baseUrl}/${id}`,
      json: fixture
    };
    request.put(options, function(error, response, responseBody) {
      if (error) {
        done(error);
      } else {
        responseBody = responseBody[0];
        expect(responseBody.name).to.equal(fixture.name);
        expect(responseBody.allergen).to.equal(fixture.allergen);
        expect(responseBody.unit_of_measurement).to.equal(
          fixture.unit_of_measurement
        );
        expect(responseBody.amount_in_stock).to.equal(fixture.amount_in_stock);
        expect(response.statusCode).to.equal(200);
        done();
      }
    });
  });
  it("PUT " + baseUrl + "/-1 should send status code 404", function(done) {
    const fixture = {
      name: "APItestinputmodifytargeted",
      allergen: "APItestinputmodifytargeted",
      unit_of_measurement: "APItestinputmodifytarged",
      amount_in_stock: 399.99
    };
    const options = {
      uri: `${baseUrl}/-1`,
      json: fixture
    };
    request.put(options, function(error, response, responseBody) {
      if (error) {
        done(error);
      } else {
        expect(response.statusCode).to.equal(404);
        done();
      }
    });
  });
  it(
    "DELETE " + baseUrl + "/id should delete the just created ingredient",
    function(done) {
      const options = {
        uri: `${baseUrl}/${id}`
      };
      request.delete(options, function(error, response, responseBody) {
        if (error) {
          done(error);
        } else {
          expect(response.statusCode).to.equal(204);
        }
        // try to fetch the deleted one, which should fail! (404)
        request.get(baseUrl + id, function(error, response, body) {
          if (error) {
            done(error);
          } else {
            expect(response.statusCode).to.equal(404);
            done();
          }
        });
      });
    }
  );
  it("DELETE " + baseUrl + "/-1 should send status code 404", function(done) {
    const options = {
      uri: `${baseUrl}/-1`
    };
    request.delete(options, function(error, response, responseBody) {
      if (error) {
        done(error);
      } else {
        expect(response.statusCode).to.equal(404);
        done();
      }
    });
  });
});
