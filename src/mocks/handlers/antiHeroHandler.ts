import { rest } from "msw";

let data = [
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
  {
    id: "89g6d5i6e45ud",
    firstName: "Jason",
    lastName: "Blood",
    house: "DC",
    knownAs: "Etrigan",
  },
  {
    id: "hvhj89gg8pt67",
    firstName: "Harley",
    lastName: "Quinn",
    house: "DC",
    knownAs: "Harley",
  },
  {
    id: "v7xSZAV",
    firstName: "Selina",
    lastName: "Kyle",
    house: "DC",
    knownAs: "Catwoman",
  },
  {
    id: "Nmla4EH",
    firstName: "Max",
    lastName: "Eisenhardt",
    house: "Marvel",
    knownAs: "Magneto",
  },
];

export const antiHeroHandler = [
  rest.get("http://localhost:5000/anti-heroes", (req, res, ctx) => {
    return res(ctx.json(data));
  }),

  rest.delete("http://localhost:5000/anti-heroes/:id", (req, res, ctx) => {
    const antiHeroExist = data.find((ah) => ah.id === req.params.id);
    return antiHeroExist ? res(ctx.status(200)) : res(ctx.status(404));
  }),

  rest.post("http://localhost:5000/anti-heroes", (req, res, ctx) => {
    return res(ctx.json(req.body));
  }),

  rest.put("http://localhost:5000/anti-heroes/:id", (req, res, ctx) => {
    console.log("ID:", req.params.id);

    return data.find((ah) => ah.id === req.params.id)
      ? res(ctx.status(200))
      : res(ctx.status(404));
  }),
];
