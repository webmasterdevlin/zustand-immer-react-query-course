import { expect, test } from '@playwright/test';

test.skip('expect welcome message', async ({ page }) => {
  await page.goto('/');
  expect(await page.textContent('h2')).toBe(
    'Welcome to Zustand, Immer, and React Query Course 🧑‍🏫 💻',
  );
  const locator = await page.getByTestId('welcome');
  locator.getByText('');
});
