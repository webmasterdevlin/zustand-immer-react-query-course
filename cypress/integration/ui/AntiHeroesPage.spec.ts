/// <reference types="cypress"/>

import { ANTI_HEROES } from "../../../src/mocks/handlers/antiHeroHandler";

describe("Anti-Heroes Page", () => {
  beforeEach(() => {
    /* Custom commands. Please see support/commands.ts
     * and the global.d.ts for intellisense */
    cy.getCommand("/anti-heroes", ANTI_HEROES);
    cy.deleteCommand("/anti-heroes/*");
    cy.NavigateByTestIdCommand("nav-anti-heroes");
    cy.SetupInputFieldsCommand();
  });

  it("should render anti heroes", () => {
    cy.get("[data-testid=card]").should("have.length", ANTI_HEROES.length);
  });

  context("Buttons inside a card", () => {
    // using cypress testing library utilities demo
    it("should marked an anti hero after clicking a mark button", () => {
      const index = 1;
      cy.findAllByTestId("mark-button").eq(index).click();
      cy.findAllByTestId("card").should("contain", "- marked");
    });

    it("should remove an anti hero from the store after clicking a remove button", () => {
      const index = 1;
      cy.get("[data-testid=remove-button]").eq(index).click();
      cy.get("[data-testid=card]").should(
        "have.length",
        ANTI_HEROES.length - 1
      );
    });

    it("should delete an anti hero from the database after clicking a delete-from-db button", () => {
      const index = 1;
      cy.get("[data-testid=delete-button]").eq(index).click();
      cy.get("[data-testid=card]").should(
        "have.length",
        ANTI_HEROES.length - 1
      );
    });
  });

  context("Save Button", () => {
    it("should add a new anti hero", () => {
      const firstName = "Bucky";
      const lastName = "Barnes";
      const house = "Marvel";
      const knownAs = "The Winter Soldier";

      cy.get("@FirstName").clear().type(firstName);
      cy.get("@LastName").clear().type(lastName);
      cy.get("@House").clear().type(house);
      cy.get("@KnownAs").clear().type(knownAs);

      cy.postCommand("/anti-heroes", {
        firstName,
        lastName,
        house,
        knownAs,
      });

      cy.get("@Save").click();

      cy.findAllByTestId("card").should("have.length", ANTI_HEROES.length + 1);
      cy.findByTestId("total-anti-heroes").contains(ANTI_HEROES.length + 1);
    });
  });
});
