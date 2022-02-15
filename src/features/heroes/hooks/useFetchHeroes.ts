import { useQuery } from 'react-query';
import { api, EndPoints } from '/src/axios/api-config';
import { HeroModel } from '../hero';

/*This function won't send an http request if not necessary.
 * So we can use this function to sync states in different components
 * */
export default function useFetchHeroes() {
  return useQuery('heroes', () => api.get<HeroModel[]>(EndPoints.heroes));
}
