import { HttpResponse, http } from 'msw';

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
  http.get(`${baseUrl}/anti-heroes`, () => {
    return HttpResponse.json(ANTI_HEROES);
  }),

  http.delete(`${baseUrl}/anti-heroes/:id`, ({ params }) => {
    const antiHeroExist = ANTI_HEROES.find(ah => {
      return ah.id === params.id;
    });
    return new HttpResponse(null, { status: antiHeroExist ? 200 : 404 });
  }),

  http.post(`${baseUrl}/anti-heroes`, ({ request }) => {
    return HttpResponse.json(request.body);
  }),

  http.put(`${baseUrl}/anti-heroes/:id`, ({ params }) => {
    console.log('ID:', params.id);
    const antiHeroExist = ANTI_HEROES.find(ah => {
      return ah.id === params.id;
    });
    return new HttpResponse(null, { status: antiHeroExist ? 200 : 404 });
  }),
];
