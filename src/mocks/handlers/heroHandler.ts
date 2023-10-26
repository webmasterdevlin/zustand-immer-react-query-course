import { HttpResponse, http } from 'msw';

const baseUrl = '**/api';

export const HEROES = [
  {
    firstName: 'Barry',
    house: 'DC',
    id: '7ggew732dw',
    knownAs: 'Flash',
    lastName: 'Allen',
  },
  {
    firstName: 'Scott',
    house: 'Marvel',
    id: '1ggew732dw',
    knownAs: 'Cyclopes',
    lastName: 'Summer',
  },
];

export const heroHandler = [
  http.get(`${baseUrl}/heroes`, () => {
    return HttpResponse.json(HEROES);
  }),

  http.delete(`${baseUrl}/heroes/:id`, ({ params }) => {
    const heroExist = HEROES.find(h => {
      return h.id === params.id;
    });
    return new HttpResponse(null, { status: heroExist ? 200 : 404 });
  }),

  http.post(`${baseUrl}/heroes`, async ({ request }) => {
    return HttpResponse.json(request.body);
  }),

  http.put(`${baseUrl}/heroes/:id`, ({ params }) => {
    const heroExist = HEROES.find(h => {
      return h.id === params.id;
    });
    return new HttpResponse(null, { status: heroExist ? 200 : 404 });
  }),
];
