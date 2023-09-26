import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  webServer: {
    command: 'pnpm run start',
    port: 5173,
    reuseExistingServer: true,
  },
  testDir: 'src/tests',
  fullyParallel: true,
};

export default config;
