Feature: Ingredient manipulation
  Everybody wants to manipulate ingredients

  Scenario: Update ingredient
    Given I have a ingredient
    When I set ingredient name to "test"
    Then The ingredient name is "test"