import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // mock heroes http request
  await page.route('**/api/villains', route => {
    route.fulfill({
      status: 201, // 403
      body: JSON.stringify([]),
    });
  });
});

test('Should add a new villain', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'villains' }).click();
  await page.getByLabel('First Name').click();
  await page.getByLabel('First Name').fill('Devlin');
  await page.getByLabel('First Name').press('Tab');
  await page.getByLabel('Last Name').fill('Duldulao');
  await page.getByLabel('Last Name').press('Tab');
  await page.getByLabel('House').fill('inmeta consulting');
  await page.getByLabel('House').press('Tab');
  await page.getByLabel('Known As').fill('Dev');
  await page.getByRole('button', { name: 'Save Character' }).click();

  const rowVillain = page.getByText('Devlin Duldulao');
  await expect(rowVillain).toBeVisible();
});
