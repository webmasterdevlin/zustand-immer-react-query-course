import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EndPoints } from '../../../axios/api-config';
import { postAxios } from '../../../axios/generic-api-calls';
import { keys } from '../../keyNames';
import type { HeroModel } from '../hero';

export default function useAddHero() {
  const queryClient = useQueryClient();

  return useMutation(
    (hero: HeroModel) => {
      return postAxios<HeroModel>(EndPoints.heroes, hero);
    },
    {
      onSuccess: ({ data }) => {
        queryClient.setQueryData<{ data: HeroModel[] }>([keys.heroes], cache => {
          return cache?.data ? { data: [...cache.data, data] } : { data: [data] };
        });
      },
    },
  );
}
