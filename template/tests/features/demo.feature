Feature: Demo

  Scenario: Access the Demo page from the home page
    Given I am on the home page
    When I click on the link "To demo"
    Then I am redirected to the Demo page
    And I see the list of users
      | user                     |
      | Leanne Graham            |
      | Ervin Howell             |
      | Clementine Bauch         |
      | Patricia Lebsack         |
      | Chelsey Dietrich         |
      | Mrs. Dennis Schulist     |
      | Kurtis Weissnat          |
      | Nicholas Runolfsdottir V |
      | Glenna Reichert          |
      | Clementina DuBuque       |

  Scenario: Display user details from the Demo page
    Given I am on the Demo page
    When I click on the user name "Leanne Graham"
    Then I see the SubDemo page for "Leanne Graham"
    And The user's information is displayed
      | Name | Email             | Phone                 | Website       | Company         | Address                                        |
      | BRET | sincere@april.biz | 1-770-736-8031 x56442 | hildegard.org | Romaguera-Crona | Kulas Light, Apt. 556, Gwenborough, 92998-3874 |

  Scenario: Return to the home page from the Demo page
    Given I am on the Demo page
    When I click on the link "Return to home"
    Then I am redirected to the home page
