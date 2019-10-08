Feature: Controller test
  Everybody wants to know if the controller works

  Scenario: Send GET request at URL
    Given I have a URL at 'http://localhost:8080/api/cars'
    When I send a GET request to that URL
    Then I get returned response status code '200'