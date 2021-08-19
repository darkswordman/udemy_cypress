describe("intercept a post request", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should add a new todo correctly", () => {
    cy.intercept("POST", "http://localhost:8080/todos", "hello").as(
      "postRequest"
    );
    cy.addNewTodo("First todo");
    cy.wait("@postRequest").then((xhr) => {
      expect(xhr.request.body.name).to.eql("First todo");
    });

    cy.get(".todo-item").last().should("contain.text", "First todo");
  });
});
