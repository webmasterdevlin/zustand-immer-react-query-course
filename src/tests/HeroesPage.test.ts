import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // mock heroes http request
  await page.route('**/api/heroes', route => {
    route.fulfill({
      status: 200,
      body: JSON.stringify([
        {
          id: '7ggew732dw',
          firstName: 'Barry',
          lastName: 'Allen',
          house: 'DC',
          knownAs: 'Flash',
        },
        {
          id: '1ggew732dw',
          firstName: 'Scott',
          lastName: 'Summer',
          house: 'Marvel',
          knownAs: 'Cyclopes',
        },
      ]),
    });
  });
});

test('Success heroes HTTP fetch', async ({ page }) => {
  await page.goto('/heroes');

  const row1 = page.getByText('Barry Allen');
  await expect(row1).toBeVisible();

  const row2 = page.getByText('Scott Summer');
  await expect(row2).toBeVisible();
});
