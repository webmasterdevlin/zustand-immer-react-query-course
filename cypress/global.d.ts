/// <reference types="cypress"/>

declare namespace Cypress {
  interface Chainable {
    getCommand(url: string, responseBody: Array<any>): Chainable<any>;
    deleteCommand(
      url: string,
      responseBody: Array<any>,
      index: number
    ): Chainable<any>;
    postCommand(url: string, requestBody: any): Chainable<any>;
    SetupInputFieldsCommand(): Chainable<any>;
    NavigateByTestIdCommand(testId: string): Chainable<any>;
  }
}
