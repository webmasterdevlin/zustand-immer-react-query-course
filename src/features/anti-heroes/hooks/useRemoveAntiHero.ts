import { useMutation } from 'react-query';
import { EndPoints } from '../../../axios/api-config';
import { queryClient } from '../../../../src/App';
import { AntiHeroModel } from '../antiHero';
import { keys } from '../../keyNames';
import { deleteAxios } from '../../../axios/generic-api-calls';

export default function useRemoveAntiHero() {
  return useMutation(
    antiHeroId => deleteAxios(EndPoints.antiHeroes, antiHeroId),
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
              data: [...backup.data.filter(ah => ah.id !== antiHeroId)],
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
      onSettled: () => queryClient.invalidateQueries([keys.antiHeroes]),
    },
  );
}
