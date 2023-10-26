### Sequence in writing automated tests

- install dependencies

- packages to install

```zh
pnpm i -D @playwright/test @testing-library/dom @testing-library/jest-dom @testing-library/react @testing-library/react-hooks @testing-library/user-event @types/jest @types/testing-library__jest-dom @vitest/coverage-c8 @vitest/coverage-istanbul @vitest/ui jsdom msw vitest
```

- update vite config with `/// <reference types="vitest" />` and test: {}
- write test for the helpers/compute.ts
- update the package.json by adding unit tests scripts runner
- run test
- write mocks
- add setupTests.ts
- update vite config adding the setupTests.ts
- write test for the pages/
- run test using different scripts
- add playwright config
- update the package.json by adding e2e tests scripts runner
- write tests in e2e folder for home page and heroes
- run tests
- show playwright code gen for adding new villain. NOTE: app should be running
- run test
- challenge: write some tests in an existing website with and without using playwright code generator
