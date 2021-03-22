/// <reference types="cypress"/>

import { VILLAINS } from "../../../src/mocks/handlers/villainHandler";

describe("Villains Page", () => {
  beforeEach(() => {
    /* Custom commands. Please see support/commands.ts
     * and the global.d.ts for intellisense */
    cy.getCommand("/villains", VILLAINS);
    cy.deleteCommand("/villains/*");
    cy.NavigateByTestIdCommand("nav-villains");
    cy.SetupInputFieldsCommand();
  });

  it("should render villains", () => {
    cy.get("[data-testid=card]").should("have.length", VILLAINS.length);
  });

  context("Buttons inside a card", () => {
    // using cypress testing library utilities demo
    it("should marked a villain after clicking a mark button", () => {
      cy.findAllByTestId("mark-button").eq(1).click();
      cy.findAllByTestId("card").should("contain", "- marked");
    });

    it("should remove a villain from the store after clicking a remove button", () => {
      cy.get("[data-testid=remove-button]").eq(1).click();
      cy.get("[data-testid=card]").should("have.length", 1);
    });

    it("should delete a villain from the database after clicking a delete-from-db button", () => {
      cy.get("[data-testid=delete-button]").eq(1).click();
    });
  });

  context("Save Button", () => {
    it("should add a new villain", () => {
      const firstName = "Victor";
      const lastName = "Von Doom";
      const house = "Marvel";
      const knownAs = "Doctor Doom";

      cy.get("@FirstName").clear().type(firstName);
      cy.get("@LastName").clear().type(lastName);
      cy.get("@House").clear().type(house);
      cy.get("@KnownAs").clear().type(knownAs);

      cy.postCommand("/villains", {
        firstName,
        lastName,
        house,
        knownAs,
      });

      cy.get("@Save").click();

      cy.findAllByTestId("card").should("have.length", VILLAINS.length + 1);
      cy.findByTestId("total-villains").contains(VILLAINS.length + 1);
    });
  });
});
