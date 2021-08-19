describe("fixture tests", () => {
  beforeEach(() => {
    cy.fixture("user").as("user");
  });

  it("fixtures", () => {
    cy.visit("cypress/index.html");
    cy.fixture("user").then((user) => {
      cy.log(user);
      cy.get("#inputEmail").type(user.email);
      cy.get("#inputPassword").type(user.password);
    });

    cy.get("@user").then((user) => {
      cy.log(user);
      cy.get("#inputEmail").type(user.email);
      cy.get("#inputPassword").type(user.password);
    });

    // Modify a fixture
    cy.fixture("user")
      .then((user) => {
        user.email = "crisdev@gmail.com";
      })
      .as("user");

    cy.get("@user").then((user) => {
      cy.log(user);
    });

    // writeFile and readFile
    cy.readFile("example.txt");
    cy.writeFile("example.txt", "Cypress is tha beast");
  });
});
