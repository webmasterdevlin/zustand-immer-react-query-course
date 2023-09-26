import { rest } from 'msw';

const baseUrl = '**/api';

export const ANTI_HEROES = [
  {
    firstName: 'Eddy',
    house: 'Marvel',
    id: '4893hfwuig',
    knownAs: 'Venom',
    lastName: 'Brock',
  },
  {
    firstName: 'Wade',
    house: 'Marvel',
    id: '9greg7t767g',
    knownAs: 'Deadpool',
    lastName: 'Wilson',
  },
];

export const antiHeroHandler = [
  rest.get(`${baseUrl}/anti-heroes`, (req, res, ctx) => {
    return res(ctx.json(ANTI_HEROES));
  }),

  rest.delete(`${baseUrl}/anti-heroes/:id`, (req, res, ctx) => {
    const antiHeroExist = ANTI_HEROES.find(ah => {
      return ah.id === req.params.id;
    });
    return antiHeroExist ? res(ctx.status(200)) : res(ctx.status(404));
  }),

  rest.post(`${baseUrl}/anti-heroes`, (req, res, ctx) => {
    return res(ctx.json(req.body));
  }),

  rest.put(`${baseUrl}/anti-heroes/:id`, (req, res, ctx) => {
    console.log('ID:', req.params.id);

    return ANTI_HEROES.find(ah => {
      return ah.id === req.params.id;
    })
      ? res(ctx.status(200))
      : res(ctx.status(404));
  }),
];
