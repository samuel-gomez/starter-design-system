Feature: FormDemo

  Scenario: Submit empty form
    Given I am on the FormDemo page
    When I submit the login form
    Then I should see the error message "Email is required."
    And I should see the error message "Password is required."

  Scenario: Submit form with invalid email
    Given I am on the FormDemo page
    When I fill the email field with "invalid-email"
    And I fill the password field with "password123"
    And I submit the login form
    Then I should see the error message "Invalid email format."
    And I should not see the error message "Password is required."

  Scenario: Submit form with valid data
    Given I am on the FormDemo page
    When I fill the email field with "user@example.com"
    And I fill the password field with "password123"
    And I submit the login form
    Then I should not see the error message "Email is required."
    And I should not see the error message "Invalid email format."
    And I should not see the error message "Password is required."
