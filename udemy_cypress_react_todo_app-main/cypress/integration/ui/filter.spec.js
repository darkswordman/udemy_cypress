describe("filter functionality test", () => {
  // UI
  // API
  // Mock
  before(() => {
    /** UI FIRST */
    // cy.visit("http://localhost:3000/");

    // const todosExample = ["todo1", "todo2", "todo3", "todo4", "todo5"].forEach(
    //   (todo) => {
    //     cy.addNewTodo(todo);
    //   }
    // );
    // cy.get(".todo-checkbox").first().check().should("be.checked");
    // cy.get(".todo-checkbox").last().check().should("be.checked");

    /** API */
    cy.addDummyTodos();
    cy.visit("http://localhost:3000/");
  });

  after(() => {
    cy.get("body").then(($el) => {
      if ($el.find(".delete-item").length > 0) {
        cy.get(".delete-item").click({ multiple: true });
      }
    });
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
