## Redux Query Course with Zustand, Immer, and React Table

#### Tech tools
- https://pnpm.io
- https://vitejs.dev
- https://react-hook-form.com
- https://zod.dev
- https://mantine.dev
- https://vitest.dev
- https://playwright.dev

```sh
$ git clone https://github.com/webmasterdevlin/zustand-immer-react-query-course.git
$ cd zustand-immer-react-query-course
$ pnpm install
$ pnpm run start:fullstack
```

#### E2e testing
```sh
$ npx playwright install
$ pnpm run test:e2e
```


The React app, and the fake web service will run concurrently.

![screenshot](./screenshot.png)


### Best practices in writing tests

https://kentcdodds.com/blog/common-mistakes-with-react-testing-library

- always use eslint-plugin-testing-library and eslint-plugin-jest-dom
- always use screen
- use screen.getByRole instead of screen.getByTestId
- use screen.queryByRole only when expecting not.toBeInTheDocument
- use await screen.find* instead of await waitFor/wait
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
