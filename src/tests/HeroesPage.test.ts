import { expect, test } from '@playwright/test';

// test.beforeEach(async ({ page }) => {
//   // mock heroes http request
//   await page.route('http://localhost:3000/api/heroes', route => {
//     route.fulfill({
//       status: 200,
//       body: JSON.stringify([
//         {
//           id: '7ggew732dw',
//           firstName: 'Barry',
//           lastName: 'Allen',
//           house: 'DC',
//           knownAs: 'Flash',
//         },
//         {
//           id: '1ggew732dw',
//           firstName: 'Scott',
//           lastName: 'Summer',
//           house: 'Marvel',
//           knownAs: 'Cyclopes',
//         },
//       ]),
//     });
//   });
// });

test('Success heroes HTTP fetch', async ({ page }) => {
  await page.route('http://localhost:5173/api/heroes', route => {
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

  await page.goto('http://localhost:5173/heroes');

  // const a = page.locator('data-test-id=card');
  // console.log(a);
  // expect(await a.all()).toHaveLength(2);

  // const b = page.getByTestId('card');
  // console.log(b);
  // expect(await b.all()).toHaveLength(2);
});
