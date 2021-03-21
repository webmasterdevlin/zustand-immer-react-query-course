import { rest } from "msw";

const baseUrl = "http://localhost:5000";

export const ANTI_HEROES = [
  {
    id: "4893hfwuig",
    firstName: "Eddy",
    lastName: "Brock",
    house: "Marvel",
    knownAs: "Venom",
  },
  {
    id: "9greg7t767g",
    firstName: "Wade",
    lastName: "Wilson",
    house: "Marvel",
    knownAs: "Deadpool",
  },
];

export const antiHeroHandler = [
  rest.get(`${baseUrl}/anti-heroes`, (req, res, ctx) => {
    return res(ctx.json(ANTI_HEROES));
  }),

  rest.delete(`${baseUrl}/anti-heroes/:id`, (req, res, ctx) => {
    const antiHeroExist = ANTI_HEROES.find((ah) => ah.id === req.params.id);
    return antiHeroExist ? res(ctx.status(200)) : res(ctx.status(404));
  }),

  rest.post(`${baseUrl}/anti-heroes`, (req, res, ctx) => {
    return res(ctx.json(req.body));
  }),

  rest.put(`${baseUrl}/anti-heroes/:id`, (req, res, ctx) => {
    console.log("ID:", req.params.id);

    return ANTI_HEROES.find((ah) => ah.id === req.params.id)
      ? res(ctx.status(200))
      : res(ctx.status(404));
  }),
];
