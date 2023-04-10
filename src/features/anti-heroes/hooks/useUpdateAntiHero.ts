import { useMutation } from 'react-query';
import { queryClient } from '../../../App';
import { EndPoints } from '../../../axios/api-config';
import { putAxios } from '../../../axios/generic-api-calls';
import { keys } from '../../keyNames';
import type { AntiHeroModel } from '../antiHero';

export default function useUpdateAntiHero() {
  return useMutation(
    antiHero => {
      return putAxios<AntiHeroModel, AntiHeroModel>(EndPoints.antiHeroes, antiHero.id, antiHero);
    },
    {
      onMutate: async (antiHero: AntiHeroModel) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries([keys.antiHeroes]);

        // Snapshot the previous value
        const backup = queryClient.getQueryData<{ data: AntiHeroModel[] }>([keys.antiHeroes]);

        // Optimistically update by updating the antiHero
        if (backup)
          queryClient.setQueryData<{ data: AntiHeroModel[] }>([keys.antiHeroes], {
            data: [
              ...backup.data.map(ah => {
                return ah.id === antiHero.id ? antiHero : ah;
              }),
            ],
          });

        return { backup };
      },

      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (err, variables, context) => {
        if (context?.backup) queryClient.setQueryData<AntiHeroModel[]>([keys.antiHeroes], context.backup.data);
      },
      // Always refetch after error or success:
      onSettled: () => {
        return queryClient.invalidateQueries([keys.antiHeroes]);
      },
    },
  );
}
