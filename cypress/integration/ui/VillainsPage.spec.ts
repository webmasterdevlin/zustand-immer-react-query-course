/// <reference types="cypress"/>

import { VILLAINS } from "../../../src/mocks/handlers/villainHandler";
import { ANTI_HEROES } from "../../../src/mocks/handlers/antiHeroHandler";
import { HEROES } from "../../../src/mocks/handlers/heroHandler";

describe("Villains Page", () => {
  beforeEach(() => {
    /* Custom commands. Please see support/commands.ts
     * and the global.d.ts for intellisense */
    cy.getCommand("/anti-heroes", ANTI_HEROES);
    cy.getCommand("/heroes", HEROES);
    cy.getCommand("/villains", VILLAINS);
    cy.NavigateByTestIdCommand("nav-villains");
    cy.SetupInputFieldsCommand();
  });

  it("should render villains", () => {
    cy.get("[data-testid=card]").should("have.length", VILLAINS.length);
  });

  context("Buttons inside a card", () => {
    // using cypress testing library utilities demo
    it("should marked a villain after clicking a mark button", () => {
      const index = 1;
      cy.findAllByTestId("mark-button").eq(index).click();
      cy.findAllByTestId("card").should("contain", "- marked");
    });

    it("should remove a villain from the store after clicking a remove button", () => {
      const index = 1;
      cy.get("[data-testid=remove-button]").eq(index).click();
      cy.get("[data-testid=card]").should("have.length", VILLAINS.length - 1);
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

  context("Refetch", () => {
    it("should refetch all villains after soft deleting all villains", () => {
      cy.get("[data-testid=remove-button]").each(($el) => cy.wrap($el).click());
      cy.get("[data-testid=card]").should("not.exist");
      cy.get("[data-testid=refetch-button]").click();
      cy.get("[data-testid=card]").should("have.length", VILLAINS.length);
      cy.get("[data-testid=total-villains]").contains(VILLAINS.length);
    });

    it("should refetch all villains after deleting all villains", () => {
      cy.get("[data-testid=delete-button]").each(($el) => cy.wrap($el).click());
      cy.get("[data-testid=card]").should("not.exist");
      cy.get("[data-testid=refetch-button]").click();
      cy.get("[data-testid=card]").should("have.length", VILLAINS.length);
      cy.get("[data-testid=total-villains]").contains(VILLAINS.length);
    });
  });
});
