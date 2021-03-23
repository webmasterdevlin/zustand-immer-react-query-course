/// <reference types="cypress"/>

import { HEROES } from "../../../src/mocks/handlers/heroHandler";
import { ANTI_HEROES } from "../../../src/mocks/handlers/antiHeroHandler";
import { VILLAINS } from "../../../src/mocks/handlers/villainHandler";

describe.skip("Heroes Page", () => {
  beforeEach(() => {
    /* Custom commands. Please see support/commands.ts
     * and the global.d.ts for intellisense */
    cy.getCommand("/anti-heroes", ANTI_HEROES);
    cy.getCommand("/heroes", HEROES);
    cy.getCommand("/villains", VILLAINS);
    cy.deleteCommand("/anti-heroes/*");
    cy.deleteCommand("/heroes/*");
    cy.deleteCommand("/villains/*");
    cy.NavigateByTestIdCommand("nav-heroes");
    cy.SetupInputFieldsCommand();
  });

  it("should render heroes", () => {
    cy.get("[data-testid=card]").should("have.length", HEROES.length);
  });

  context("Buttons inside a card", () => {
    // using cypress testing library utilities demo
    it("should marked a hero after clicking a mark button", () => {
      const index = 1;
      cy.findAllByTestId("mark-button").eq(index).click();
      cy.findAllByTestId("card").should("contain", "- marked");
    });

    it("should remove a hero from the store after clicking a remove button", () => {
      const index = 1;
      cy.get("[data-testid=remove-button]").eq(index).click();
      cy.get("[data-testid=card]").should("have.length", HEROES.length - 1);
    });

    it("should delete a hero from the database after clicking a delete-from-db button", () => {
      const index = 1;
      cy.get("[data-testid=delete-button]").eq(index).click();
      cy.get("[data-testid=card]").should("have.length", HEROES.length - 1);
    });
  });

  context("Save Button", () => {
    it("should add a new hero", () => {
      const firstName = "Bruce";
      const lastName = "Wayne";
      const house = "DC";
      const knownAs = "Batman";

      cy.get("@FirstName").clear().type(firstName);
      cy.get("@LastName").clear().type(lastName);
      cy.get("@House").clear().type(house);
      cy.get("@KnownAs").clear().type(knownAs);

      cy.postCommand("/heroes", {
        firstName,
        lastName,
        house,
        knownAs,
      });

      cy.get("@Save").click();

      cy.findAllByTestId("card").should("have.length", HEROES.length + 1);
      cy.findByTestId("total-heroes").contains(HEROES.length + 1);
    });
  });

  context("Refetch", () => {
    it("should refetch all heroes after soft deleting all heroes", () => {
      cy.get("[data-testid=remove-button]").each(($el) => cy.wrap($el).click());
      cy.get("[data-testid=card]").should("not.exist");
      cy.get("[data-testid=refetch-button]").click();
      cy.get("[data-testid=card]").should("have.length", HEROES.length);
      cy.get("[data-testid=total-heroes]").contains(HEROES.length);
    });

    it("should refetch all heroes after deleting all heroes", () => {
      cy.get("[data-testid=delete-button]").each(($el) => cy.wrap($el).click());
      cy.get("[data-testid=card]").should("not.exist");
      cy.get("[data-testid=refetch-button]").click();
      cy.get("[data-testid=card]").should("have.length", HEROES.length);
      cy.get("[data-testid=total-heroes]").contains(HEROES.length);
    });
  });
});
