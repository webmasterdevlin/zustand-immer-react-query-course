import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // mock heroes http request
  await page.route('**/api/heroes', route => {
    route.fulfill({
      json: [
        {
          firstName: 'Barry',
          house: 'DC',
          id: '7ggew732dw',
          knownAs: 'Flash',
          lastName: 'Allen',
        },
        {
          firstName: 'Scott',
          house: 'Marvel',
          id: '1ggew732dw',
          knownAs: 'Cyclopes',
          lastName: 'Summer',
        },
      ],
    });
  });
});

test('Should get list of heroes', async ({ page }) => {
  await page.goto('/heroes');

  const row1 = page.getByText('Barry Allen');
  await expect(row1).toBeVisible();

  const row2 = page.getByText('Scott Summer');
  await expect(row2).toBeVisible();
});
