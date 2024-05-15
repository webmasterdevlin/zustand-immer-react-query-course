## Tanstack Query Course with Zustand, Immer, and React Table
### There are two versions of this application. One using React Router and one using Tanstack Router
- Tanstack Router: `main` branch
- React Router: `using-react-router` branch

#### Tech tools

- https://bun.sh
- https://vitejs.dev
- https://react-hook-form.com
- https://zod.dev
- https://tanstack.com/router/latest
- https://tailwindcss.com
- https://zustand-demo.pmnd.rs
- https://tanstack.com
- https://vitest.dev
- https://playwright.dev

```sh
$ git clone https://github.com/webmasterdevlin/zustand-immer-react-query-course.git
```

```sh
$ cd zustand-immer-react-query-course
```

```sh
$ bun install
```

```sh
$ bun run start
```

#### E2e testing

```sh
$ npx playwright install
```

```sh
$ bun run test:e2e
```

The React app, and the fake web service will run concurrently.

![screenshot](./screenshot.png)

## Vitest

## Tanstack Router

- routeTree.gen.ts is an auto generated route tree

## Set up MSW for mocking API calls

- bun i -D msw
- the msw is a mocking library which will intercept the requests and responses in the integration tests
- create ./src/mocks/handler/todoHandler.ts
- create ./src/mocks/handler/index.ts
- create ./src/mocks/server.ts
- update the ./src/setupTests.ts

## Integration tests

- write integration tests for the fetch todos function of WorkTodosPage.tsx by creating ./src/pages/tests/WorkTodosPage.test.ts
- run the tests, pnpm run test, and see if the todos are rendered

#### TanStack Query persist cache between tests

- the beforeEach does not work

```ts
beforeEach(() => {
  queryClient.clear();
});
```
