Feature: Mobile phone filter on Amazon Germany

Scenario: Display mobile phones based on purchase conditions
    Given I navigate to "https://www.amazon.de"
    When I click on the "All" link text on the left side of the homepage
    And I click on "Electronics & Computers" under the All categories section
    And I click on "Phones & Accessories"
    And I apply filters for "Samsung" brand, "New" condition, and price range "100-350"
    Then I verify that the displayed mobile phones match the applied filters

    
    
