import { expect, test } from '@playwright/test';

test('submit is successful', async ({ page }) => {
  await page.goto('/heroes');

  const total = await (await page.getByRole('row')).count();
  await expect(total).toBe(7);

  await page.type('input[name="firstName"]', 'Clark');
  await page.type('input[name="lastName"]', 'Kent');
  await page.type('input[name="house"]', 'Smallville');
  await page.type('input[name="knownAs"]', 'Superman');
  await page.click('button:has-text("Save Character")');
});
