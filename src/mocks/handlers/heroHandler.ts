import { rest } from "msw";

let data = [
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
  {
    id: "dfw7g2",
    firstName: "Peter",
    lastName: "Parker",
    house: "Marvel",
    knownAs: "Spiderman",
  },
  {
    id: "9gfw9gde",
    firstName: "Bruce",
    lastName: "Wayne",
    house: "DC",
    knownAs: "Batman",
  },
  {
    firstName: "Devlin",
    lastName: "D.",
    house: "Starks",
    knownAs: "Wolf",
    id: "gjcM7z8",
  },
];

export const heroHandler = [
  rest.get("http://localhost:5000/heroes", (req, res, ctx) => {
    return res(ctx.json(data));
  }),

  rest.delete("http://localhost:5000/heroes/:id", (req, res, ctx) => {
    return data.find((h) => h.id === req.params.id)
      ? res(ctx.status(200))
      : res(ctx.status(404));
  }),

  rest.post("http://localhost:5000/heroes", (req, res, ctx) => {
    return res(ctx.json(req.body));
  }),

  rest.put("http://localhost:5000/heroes/:id", (req, res, ctx) => {
    return data.find((h) => h.id === req.params.id)
      ? res(ctx.status(200))
      : res(ctx.status(404));
  }),
];
