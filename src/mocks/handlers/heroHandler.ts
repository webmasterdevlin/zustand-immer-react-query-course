import { rest } from "msw";

const baseUrl = "http://localhost:5000";

export const HEROES = [
  {
    id: "7ggew732dw",
    firstName: "Barry",
    lastName: "Allen",
    house: "DC",
    knownAs: "Flash",
  },
  {
    id: "1ggew732dw",
    firstName: "Scott",
    lastName: "Summer",
    house: "Marvel",
    knownAs: "Cyclopes",
  },
];

export const heroHandler = [
  rest.get(`${baseUrl}/heroes`, (req, res, ctx) => {
    return res(ctx.json(HEROES));
  }),

  rest.delete(`${baseUrl}/heroes/:id`, (req, res, ctx) => {
    return HEROES.find((h) => h.id === req.params.id)
      ? res(ctx.status(200))
      : res(ctx.status(404));
  }),

  rest.post(`${baseUrl}/heroes`, (req, res, ctx) => {
    return res(ctx.json(req.body));
  }),

  rest.put(`${baseUrl}/heroes/:id`, (req, res, ctx) => {
    return HEROES.find((h) => h.id === req.params.id)
      ? res(ctx.status(200))
      : res(ctx.status(404));
  }),
];
