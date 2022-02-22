import { useMutation } from 'react-query';
import { api, EndPoints } from '../../../axios/api-config';
import { queryClient } from '../../../../src/App';
import { AntiHeroModel } from '../antiHero';
import { keys } from '../../keyNames';

export default function useUpdateAntiHero() {
  return useMutation(
    antiHero =>
      api.post<AntiHeroModel>(
        `${EndPoints.antiHeroes}/${antiHero.id}`,
        antiHero,
      ),
    {
      onMutate: async (antiHero: AntiHeroModel) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries([keys.antiHeroes]);

        // Snapshot the previous value
        const backup = queryClient.getQueryData<{ data: AntiHeroModel[] }>([
          keys.antiHeroes,
        ]);

        // Optimistically update by updating the antiHero
        if (backup)
          queryClient.setQueryData<{ data: AntiHeroModel[] }>(
            [keys.antiHeroes],
            {
              data: [
                ...backup.data.map(ah =>
                  ah.id === antiHero.id ? antiHero : ah,
                ),
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
      onSettled: () => queryClient.invalidateQueries([keys.antiHeroes]),
    },
  );
}
