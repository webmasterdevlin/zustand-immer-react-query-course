import { useMutation } from 'react-query';
import { queryClient } from '../../../../src/App';
import { EndPoints } from '../../../axios/api-config';
import { deleteAxios } from '../../../axios/generic-api-calls';
import { keys } from '../../keyNames';
import type { AntiHeroModel } from '../antiHero';

export default function useRemoveAntiHero() {
  return useMutation(
    antiHeroId => {
      return deleteAxios(EndPoints.antiHeroes, antiHeroId);
    },
    {
      onMutate: async (antiHeroId: string) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries([keys.antiHeroes]);

        // Snapshot the previous value
        const backup = queryClient.getQueryData<{ data: AntiHeroModel[] }>([
          keys.antiHeroes,
        ]);

        // Optimistically update by removing the antiHero
        if (backup)
          queryClient.setQueryData<{ data: AntiHeroModel[] }>(
            [keys.antiHeroes],
            {
              data: [
                ...backup.data.filter(ah => {
                  return ah.id !== antiHeroId;
                }),
              ],
            },
          );

        return { backup };
      },

      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (err, variables, context) => {
        if (context?.backup)
          queryClient.setQueryData<AntiHeroModel[]>(
            [keys.antiHeroes],
            context.backup.data,
          );
      },
      // Always refetch after error or success:
      onSettled: () => {
        return queryClient.invalidateQueries([keys.antiHeroes]);
      },
    },
  );
}
