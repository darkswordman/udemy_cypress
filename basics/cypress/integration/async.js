describe("async tests", () => {
  beforeEach(() => {
    cy.visit("cypress/index.html");
    // cypress Variable
    cy.url().as("url");
  });

  it("async...", () => {
    let currentURL = "";
    cy.url().then((url) => {
      currentURL = url;
      expect(currentURL).to.contains("index.html");
    });

    // chai command, not syncronous with cypress commands!
    // expect(currentURL).to.contains("index.html");

    // Cypress variable
    cy.get("@url");
  });

  it("aliases", function () {
    // Cypress variable
    cy.get("@url");

    cy.log(this.url); // this syntax only works on functions, not () => {}
  });
});
