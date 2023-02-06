import { useQuery } from 'react-query';
import { EndPoints } from '../../../axios/api-config';
import { getAxios } from '../../../axios/generic-api-calls';
import { HeroModel } from '../hero';

/*This function won't send an http request if not necessary.
 * So we can use this function to sync states in different components
 * */
export default function useFetchHeroes() {
  return useQuery('heroes', () => getAxios<HeroModel[]>(EndPoints.heroes));
}
