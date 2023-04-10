import { useQuery } from 'react-query';
import { EndPoints } from '../../../axios/api-config';
import { getAxios } from '../../../axios/generic-api-calls';
import { keys } from '../../keyNames';
import type { AntiHeroModel } from '../antiHero';

/* This function won't send an http request if not necessary.
 * So we can use this function to sync states in different components
 * */
export default function useFetchAntiHeroes() {
  return useQuery([keys.antiHeroes], () => {
    return getAxios<AntiHeroModel[]>(EndPoints.antiHeroes);
  });
}
