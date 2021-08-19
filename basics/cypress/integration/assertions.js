describe("Assertions section Test", () => {
  it("should gg", () => {
    cy.visit("cypress/index.html");
    cy.get(".course-list > .list1").should("have.text", "Cypress");
    cy.get(".course-list").should("contain", "Cypress");

    // display
    cy.get(".list10").should("not.be.visible");

    // have class
    cy.findByText("detox").should("have.class", "mobile");

    // Have css property
    cy.get(".trigger-button")
      .trigger("mouseover")
      .should("have.css", "background-color", "rgb(255, 0, 0)");
    cy.get(".trigger-button")
      .trigger("mouseover")
      .should("have.css", "background-color")
      .and("eql", "rgb(255, 0, 0)");

    // Should be enabled
    cy.findByLabelText(/email address/i).should("be.enabled");

    // Have attr
    cy.get(".random-image").should(
      "have.attr",
      "src",
      "https://picjumbo.com/wp-content/uploads/the-golden-gate-bridge-sunset-1080x720.jpg"
    );
    cy.get(".random-image")
      .should("have.attr", "src")
      .and(
        "eql",
        "https://picjumbo.com/wp-content/uploads/the-golden-gate-bridge-sunset-1080x720.jpg"
      );

    // Have a value
    cy.findByLabelText(/email address/i)
      .type("test@gmail.com")
      .should("have.value", "test@gmail.com");

    // Should excersise
    cy.findByLabelText(/fries/i).check().should("be.checked");
    cy.findByLabelText(/banana/i).should("not.be.checked");

    cy.findByRole("radio", { name: /developer/i }).check().should('be.checked');
    cy.findByRole("radio", { name: /Tester/i }).should('not.be.checked');

    cy.findByRole('option', { name: /wdio/i }).parent().select('wdio').should('have.value', 'wdio');
    cy.get('#courses').select('wdio').should('have.value', 'wdio');
    // cy.findByRole('option', { name: /selenium/i }).should('not.be.selected');
  });
});
