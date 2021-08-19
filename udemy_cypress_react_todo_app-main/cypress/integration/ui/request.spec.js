describe("Request command suite", () => {
  it("Get requests", () => {
    cy.request("GET", "http://localhost:8080/todos").then((res) => {
      cy.log(res.status);
      cy.log(res.statusText);
      cy.log(res.duration);
      cy.log(res.headers);
      cy.log(res.body);

      cy.wrap(res.status).should("equal", 200);
      expect(res.status).to.be.equal(200);
      expect(res.duration).to.be.lessThan(20000);
      // expect(res.body[0].isComplete).to.be.false;
    });

    //?name=value
    cy.request({
      method: "GET",
      url: "http://localhost:8080/todos",
      qs: {
        id: 1790,
      },
    }).then((res) => {
      cy.log(res.status);
      cy.log(res.statusText);
      cy.log(res.duration);
      cy.log(res.headers);
      cy.log(res.body);

      cy.wrap(res.status).should("equal", 200);
      expect(res.status).to.be.equal(200);
      expect(res.duration).to.be.lessThan(20000);
    });

    // post req
    cy.request({
      method: "POST",
      url: "http://localhost:8080/todos",
      body: { name: "Cypress post", isComplete: true },
    }).then((res) => {
      cy.log(res.status);
      cy.log(res.statusText);
      cy.log(res.duration);
      cy.log(res.headers);
      cy.log(res.body);

      cy.wrap(res.status).should("equal", 201);
      expect(res.status).to.be.equal(201);
      expect(res.duration).to.be.lessThan(20000);
    });
  });

  it("secured api", () => {
    cy.log("signup first");
    cy.request({
      method: "POST",
      url: "http://localhost:8080/signup",
      body: {
        email: `test${Math.ceil(Math.random() * 9999)}@test.com`,
        password: "123456",
        firstname: "Cris",
        lastname: "Dev",
        age: 34,
      },
    }).then((res) => {
      cy.log(res.status);
      cy.log(res.body.accessToken);

      cy.request({
        method: "GET",
        url: "http://localhost:8080/courses",
        auth: {
          bearer: res.body.accessToken,
        },
      }).then((res) => {
        expect(res.status).to.be.equal(200);
      });

      cy.request({
        method: "GET",
        url: "http://localhost:8080/courses",
        headers: {
          Authorization: `Bearer ${res.body.accessToken}`,
        },
      }).then((res) => {
        expect(res.status).to.be.equal(200);
      });
    });

    cy.log("signin");

    cy.log("access secured api");
  });
});
