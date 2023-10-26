import { HttpResponse, http } from 'msw';

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
  http.get(`${baseUrl}/villains`, () => {
    return HttpResponse.json(VILLAINS);
  }),

  http.delete(`${baseUrl}/villains/:id`, ({ params }) => {
    const villainExist = VILLAINS.find(v => {
      return v.id === params.id;
    });
    return new HttpResponse(null, { status: villainExist ? 200 : 404 });
  }),

  http.post(`${baseUrl}/villains`, ({ request }) => {
    return HttpResponse.json(request.body);
  }),

  http.put(`${baseUrl}/villains/:id`, ({ params }) => {
    const villainExist = VILLAINS.find(v => {
      return v.id === params.id;
    });
    return new HttpResponse(null, { status: villainExist ? 200 : 404 });
  }),
];
