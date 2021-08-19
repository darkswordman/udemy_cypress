describe("Test app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  afterEach(() => {
    cy.get("body").then(($el) => {
      if ($el.find(".delete-item").length > 0) {
        cy.get(".delete-item").click({ multiple: true });
      }
    });
  });

  it("should add a new todo correctly", () => {
    cy.addNewTodo("First todo");
    cy.get(".todo-item").last().should("contain.text", "First todo");
  });

  it("should to toggle the status of a todo correctly", () => {
    cy.addNewTodo("Second todo");
    cy.get(".todo-checkbox").last().check().should("be.checked");
    cy.get(".todo-checkbox").last().uncheck().should("not.be.checked");
  });

  it("should delete a todo correctly", () => {
    cy.addNewTodo("Third todo");
    cy.get(".delete-item").click();
  });

  it("should not add an empty todo", () => {
    cy.addNewTodo("");
  });
});
