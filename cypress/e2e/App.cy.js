/* globals cy */

describe("Test App", () => {
  it("launches", () => {
    cy.visit("/");
  });

  it("opens with Fall CS courses", () => {
    cy.visit("/");
    cy.get("[data-cy=course]").should("contain", "Fall CS");
  });

  it("shows Winter courses when Winter is selected", () => {
    cy.visit("/");
    cy.get("[data-cy=Winter]").click();
    cy.get("[data-cy=course]").should("contain", "Winter");
  });

  it("shows Spring courses when Spring is selected", () => {
    cy.visit("/");
    cy.get("[data-cy=Spring]").click();
    cy.get("[data-cy=course]").should("contain", "Spring");
  });

  it("shows Fall courses when Fall is selected", () => {
    cy.visit("/");
    cy.get("[data-cy=Fall]").click();
    cy.get("[data-cy=course]").should("contain", "Fall");
  });
});