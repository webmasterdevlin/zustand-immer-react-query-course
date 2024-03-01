import { useQuery } from '@tanstack/react-query';
import { EndPoints } from '../../../http-client/api-config';
import { getAxios } from '../../../http-client/generic-api-calls';
import { keys } from '../../keyNames';
import type { AntiHeroModel } from '../antiHero';

/* This function won't send an http request if not necessary.
 * So we can use this function to sync states in different components
 * */
export default function useFetchAntiHeroes() {
  return useQuery({
    queryFn: () => {
      return getAxios<AntiHeroModel[]>(EndPoints.antiHeroes);
    },
    queryKey: [keys.antiHeroes],
  });
}
