import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EndPoints } from '../../../http-client/api-config';
import { putAxios } from '../../../http-client/generic-api-calls';
import { keys } from '../../keyNames';
import type { AntiHeroModel } from '../antiHero';

export default function useUpdateAntiHero() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: antiHero => {
      return putAxios<AntiHeroModel, AntiHeroModel>(EndPoints.antiHeroes, antiHero.id, antiHero);
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, variables, context) => {
      if (context?.backup) queryClient.setQueryData<AntiHeroModel[]>([keys.antiHeroes], context.backup.data);
    },

    onMutate: async (antiHero: AntiHeroModel) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: [keys.antiHeroes] });

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
    // Always refetch after error or success:
    onSettled: () => {
      return queryClient.invalidateQueries({ queryKey: [keys.antiHeroes] });
    },
  });
}
