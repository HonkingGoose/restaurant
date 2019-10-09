Feature: Controller test
  Everybody wants to know if the controller works

Background: I have a running server
 Given I have a server at 'localhost' on port 3000

  Scenario: Send GET request at URL
    Given I have a URL at '/api/contactinfos'
    When I send a GET request to that URL
    Then I get returned response status code '200'