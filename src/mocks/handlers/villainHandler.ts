import { rest } from "msw";

let data = [
  {
    firstName: "Lex",
    lastName: "Luther",
    house: "DC",
    knownAs: "Lex",
    id: "3290fhe",
  },
  {
    firstName: "Max",
    lastName: "Eisenhardt",
    house: "Marvel",
    knownAs: "Magneto",
    id: "6r8finlfy",
  },
];

export const villainHandler = [
  rest.get("http://localhost:5000/villains", (req, res, ctx) => {
    return res(ctx.json(data));
  }),

  rest.delete("http://localhost:5000/villains/:id", (req, res, ctx) => {
    return data.find((v) => v.id === req.params.id)
      ? res(ctx.status(200))
      : res(ctx.status(404));
  }),

  rest.post("http://localhost:5000/villains", (req, res, ctx) => {
    return res(ctx.json(req.body));
  }),

  rest.put("http://localhost:5000/villains/:id", (req, res, ctx) => {
    return data.find((v) => v.id === req.params.id)
      ? res(ctx.status(200))
      : res(ctx.status(404));
  }),
];
