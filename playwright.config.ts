import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  webServer: {
    command: 'pnpm run start:fullstack',
    port: 5173,
  },
  testDir: 'src/tests',
};

export default config;
