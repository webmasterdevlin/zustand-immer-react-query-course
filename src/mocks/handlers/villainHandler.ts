import { rest } from 'msw';

const baseUrl = '**/api';

export const VILLAINS = [
  {
    firstName: 'Lex',
    house: 'DC',
    id: '3290fhe',
    knownAs: 'Lex',
    lastName: 'Luther',
  },
  {
    firstName: 'Max',
    house: 'Marvel',
    id: '6r8finlfy',
    knownAs: 'Magneto',
    lastName: 'Eisenhardt',
  },
];

export const villainHandler = [
  rest.get(`${baseUrl}/villains`, (req, res, ctx) => {
    return res(ctx.json(VILLAINS));
  }),

  rest.delete(`${baseUrl}/villains/:id`, (req, res, ctx) => {
    return VILLAINS.find(v => {
      return v.id === req.params.id;
    })
      ? res(ctx.status(200))
      : res(ctx.status(404));
  }),

  rest.post(`${baseUrl}/villains`, (req, res, ctx) => {
    return res(ctx.json(req.json()));
  }),

  rest.put(`${baseUrl}/villains/:id`, (req, res, ctx) => {
    return VILLAINS.find(v => {
      return v.id === req.params.id;
    })
      ? res(ctx.status(200))
      : res(ctx.status(404));
  }),
];
