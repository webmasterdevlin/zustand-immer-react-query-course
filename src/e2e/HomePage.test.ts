import { expect, test } from '@playwright/test';

test('Should have visible title message', async ({ page }) => {
  await page.goto('/');
  const h2 = await page.textContent('h2');
  expect(h2).toBe('Welcome to Zustand, Immer, and React Query Course 🧑‍🏫 💻');
});
