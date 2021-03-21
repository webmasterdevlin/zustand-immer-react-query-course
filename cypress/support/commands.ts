// @ts-check
///<reference path="../global.d.ts" />
/// <reference types="cypress"/>
import "@cypress/code-coverage/support";
import "@percy/cypress";
import "@bahmutov/cy-api/support";
import "@testing-library/cypress/add-commands";
import { v4 as uuidv4 } from "uuid";

Cypress.Commands.add("getCommand", (url: string, responseBody: Array<any>) => {
  cy.intercept("GET", url, {
    statusCode: 200,
    body: responseBody,
  });
});

Cypress.Commands.add("deleteCommand", (url: string) => {
  cy.intercept("DELETE", url, {
    statusCode: 200,
  });
});

Cypress.Commands.add("postCommand", (url: string, requestBody: any) => {
  requestBody.id = uuidv4();

  cy.intercept("POST", url, {
    statusCode: 201,
    body: requestBody,
  });
});

Cypress.Commands.add("SetupInputFieldsCommand", () => {
  cy.get("[data-testid=firstName]").as("FirstName");
  cy.get("[data-testid=lastName]").as("LastName");
  cy.get("[data-testid=house]").as("House");
  cy.get("[data-testid=knownAs]").as("KnownAs");
  cy.get("[data-testid=save-character]").as("Save");
});

Cypress.Commands.add("NavigateByTestIdCommand", (testId: string) => {
  cy.visit("/");
  cy.get(`[data-testid=${testId}]`).click();
});
