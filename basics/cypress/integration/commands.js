describe("commands section", () => {
  it("commands", () => {
    cy.visit("cypress/index.html");

    // Check the console with the assertion pinned!
    cy.url().should("contain", "index.html");

    cy.title().should("eql", "Cypress Tutorials");

    // Navigate iun the browser
    cy.contains("About").click();
    cy.go("back");
    cy.go("forward");
    cy.go("back");

    // Cookie
    cy.setCookie("test_cookie", "1234567890");
    cy.setCookie("test_cookie_2", "1234567890");
    cy.getCookie("test_cookie").should("have.property", "value", "1234567890");

    cy.getCookies().should("have.length", 2);
    cy.clearCookie("test_cookie");
    cy.getCookies().should("have.length", 1);
    cy.clearCookies();
    cy.getCookies().should("have.length", 0);

    // Clock command
    const now = new Date(2021, 8, 17).getTime();
    cy.clock(now);

    // Wrap command
    const car = {
      color: "red",
      model: 2020,
      isNew: true,
      turnOn: function () {
        return "the car is on";
      },
    };

    cy.wrap(car).should("have.property", "color", "red");

    // its / invoke : JQuery methods
    cy.wrap(car).its("model");
    cy.wrap(car).invoke("turnOn");
    cy.get(".course-list").its("length");
    cy.get(".course-list").invoke("text");

    // then command
    cy.url().then((url) => {
      cy.log(typeof url);
    });

    // cy.get("").then((el) => {
    //   el.click();
    // });

    // Expect
    const courses = [
      {
        id: 1,
        title: "cypress",
      },
      {
        id: 2,
        title: "selenium",
      },
      {
        id: 3,
        title: "appium",
      },
    ];

    cy.wrap(courses).then((courses) => {
      expect(courses).to.have.length(3);
      expect(courses[0].title).to.contains("cypress");
    });

    cy.url().then((url) => {
      expect(url).to.contains("index.html");
    });

    cy.get(".list-unstyled").each((element) => {
      // cy.log(element.text());

      // JQueryshi way
      expect(element.text()).to.contains('GB of storage');

      // Cypress way
      cy.wrap(element).should('contain', 'GB of storage');
    });
  });
});
