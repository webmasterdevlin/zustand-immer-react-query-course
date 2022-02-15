import { useMutation } from 'react-query';
import { api, EndPoints } from '/src/axios/api-config';
import { queryClient } from '/src/App';
import { HeroModel } from '../hero';

export default function useRemoveHero() {
  return useMutation(
    heroId => api.delete<void>(`${EndPoints.heroes}/${heroId}`),
    {
      onMutate: async (heroId: string) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries('heroes');

        // Snapshot the previous value
        const backup =
          queryClient.getQueryData<{ data: HeroModel[] }>('heroes');

        // Optimistically update by removing the hero
        if (backup)
          queryClient.setQueryData<{ data: HeroModel[] }>('heroes', {
            data: [...backup.data.filter(h => h.id !== heroId)],
          });

        return { backup };
      },

      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (err, variables, context) => {
        if (context?.backup)
          queryClient.setQueryData<HeroModel[]>('heroes', context.backup.data);
      },
      // Always refetch after error or success:
      onSettled: () => queryClient.invalidateQueries('heroes'),
    },
  );
}
