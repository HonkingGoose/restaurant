Feature: Manipulate table
  Everybody wants to be able to manipulate a table

  Scenario: Update table availability
    Given I have a table
    When I set the table availability to '0'
    Then the table availability is '0'