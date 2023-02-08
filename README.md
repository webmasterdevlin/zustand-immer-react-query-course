## New Stack! Don't use the master or main branch

### Redux Query Course with Zustand, Immer, and React Table

- Go to tailwind-vite branch https://github.com/webmasterdevlin/zustand-immer-react-query-course/tree/tailwind-vite
- It's using pnpm (replacing npm), Vite (replacing Webpack), Tailwind (replacing MUI), React Hook Form (replacing Formik), Zod (replacing Yup), Vitest (replacing Jest), and Playwright (replacing Cypress)

The React app, and the fake web service will run concurrently.

![screenshot](./screenshot.png)

### Best practices in writing tests

https://kentcdodds.com/blog/common-mistakes-with-react-testing-library

- always use eslint-plugin-testing-library and eslint-plugin-jest-dom
- always use screen
- use screen.getByRole instead of screen.getByTestId
- use screen.queryByRole only when expecting not.toBeInTheDocument
- use await screen.find\* instead of await waitFor/wait
- if necessary, use await waitFor instead of await wait
- use userEvent instead of fireEvent
- don't use userEvent inside the callback of waitFor

### Cypress' best practices in writing tests

https://docs.cypress.io/guides/references/best-practices.html

### Application's styles

- The application is using test ID instead of role when querying dom elements
- Test IDs are simple and isolated

#### React Query persist cache between tests

- the beforeEach does not work

```ts
beforeEach(() => {
  queryClient.clear();
});
```
