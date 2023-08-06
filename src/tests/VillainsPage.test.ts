import { test, expect } from '@playwright/test';

const homePageUrl = 'http://localhost:5173/';
const villainsEndpoint = '**/api/villains';

const firstNameSelector = 'First Name';
const lastNameSelector = 'Last Name';
const houseSelector = 'House';
const knownAsSelector = 'Known As';

test('Should add a new villain', async ({ page }) => {
  await page.goto(homePageUrl);
  await page.route(villainsEndpoint, async route => {
    await route.fulfill({
      status: 200,
      body: JSON.stringify([]),
    });
  });
  await page.getByRole('button', { name: 'villains' }).click();
  await page.getByLabel(firstNameSelector).click();
  await page.getByLabel(firstNameSelector).fill('Devlin');
  await page.getByLabel(firstNameSelector).press('Tab');
  await page.getByLabel(lastNameSelector).fill('Duldulao');
  await page.getByLabel(lastNameSelector).press('Tab');
  await page.getByLabel(houseSelector).fill('inmeta consulting');
  await page.getByLabel(houseSelector).press('Tab');
  await page.getByLabel(knownAsSelector).fill('Dev');
  await page.route(villainsEndpoint, route => {
    route.fulfill({
      status: 201,
      body: JSON.stringify({
        id: '7ggew732dw',
        firstName: 'Devlin',
        lastName: 'Duldulao',
        house: 'inmeta consulting',
        knownAs: 'Dev',
      }),
    });
  });
  await page.getByRole('button', { name: 'Save Character' }).click();

  const rowVillain = page.getByText('Devlin Duldulao');
  await expect(rowVillain).toBeVisible();
});
