describe("filter functionality test", () => {
  // UI
  // API
  // Mock
  beforeEach(() => {
    /** MOCK */
    cy.intercept(
      {
        method: "GET",
        url: "http://localhost:8080/todos",
      },
      {
        fixture: 'todos',
      }
    );
    cy.visit("http://localhost:3000/");
  });

  it("should filter out the complete todos correctly", () => {
    cy.contains("Complete").click();
    cy.url().should("contain", "/complete");
    cy.get(".todo-checkbox").each((element) => {
      cy.wrap(element).should("be.checked");
    });
  });

  it("should filter the active todos correctly", () => {
    cy.contains("Active").click();
    cy.url().should("contain", "/active");
    cy.get(".todo-checkbox").each((element) => {
      cy.wrap(element).should("not.be.checked");
    });
  });
});
