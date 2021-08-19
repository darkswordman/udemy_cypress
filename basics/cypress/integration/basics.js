// Mocha

describe("Login feature test", () => {
  beforeEach(() => {
    cy.viewport(1000, 2000);
  });

  it(`should visit the website correctly`, () => {
    cy.visit("cypress/index.html");
    cy.get("h1");
    cy.get("#header1");
    cy.get("h2#header2");
    cy.get(".header1");
    cy.get(".sub");
    cy.get(".main.header1");
    cy.findByText(/welcome/i);

    // List
    cy.get(".list1");
    cy.get(".course-list > .list1");
    cy.get(".course-list").children(".list1");
    cy.get(".course-list .list1");
    cy.get(".course-list").find(".list1");
    cy.get("li").first();
    cy.get("li").last();
    cy.get("li").eq(0);
    cy.get(".course-list li").filter(".web");
    cy.findByRole("list", { name: "frameworks" }).findByText(/cypress/i);
    cy.findByRole("list", { name: "frameworks" }).within(() => {
      cy.findByText(/cypress/i);
    });

    // Texts
    cy.contains(/selenium/i);

    // Attributes
    cy.get('[data-cy="selenium-course"]');

    // Override timeout
    // cy.get('.gg', { timeout: 1500 });
  });

  it("challenge: login in the form", () => {
    cy.visit("cypress/index.html");
    cy.log("fill email and password");
    cy.findByLabelText(/email address/i).type("test@gmail.com");
    cy.findByLabelText(/password/i).type("password", { delay: 5 });
    cy.findByRole("button", { name: /sign in/i }).click();
  });

  it("test controls", () => {
    cy.get(".invoice-button").eq(1).click("top");
    cy.findAllByRole("button", { name: /download invoice/i }).eq(1);
    // cy.get(".invoice-button").click('top', { multiple: true });

    // type
    cy.get('[name="coverdInput"]').type("hello!", { force: true, delay: 1 });
    // cy.get("#inputEmail").type("example@gmail.com");
    cy.findByLabelText(/email address/i).type("example@gmail.com");

    // select & dropdowns
    cy.get("#courses").select("selenium");
    cy.findAllByRole("option", { name: /wdio/i }).parent().select("selenium");

    // Checkboxes
    cy.findAllByRole("checkbox").check();
    cy.get('[type="checkbox"]').uncheck(["Banana", "Nuts"]);
    cy.findByLabelText(/banana/i).check();
    cy.findByRole("checkbox", { name: /banana/i }).uncheck();

    // clear
    cy.findByLabelText(/email address/i)
      .type("elma@gmail.com")
      .clear();

    // focus & blur
    cy.get("#focus").focus();
    cy.get("#focus").blur();

    // mouse hover (enter, exit)
    cy.get(".trigger-button").trigger("mouseover");
    cy.get(".trigger-button").trigger("mouseout");
    cy.get(".trigger-button").trigger("mousedown");
    cy.wait(1000);
    cy.get(".trigger-button").trigger("mouseup");
  });
});
