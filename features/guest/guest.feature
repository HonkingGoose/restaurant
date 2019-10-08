Feature: Class guest manipulations
  Everybody wants to use the guest class

  Scenario: Update a guest
    Given I have a guest
    When I set the name to "test"
    Then the guest name is "test"