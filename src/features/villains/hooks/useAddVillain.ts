import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EndPoints } from '../../../http-client/api-config';
import { postAxios } from '../../../http-client/generic-api-calls';
import { keys } from '../../keyNames';
import type { VillainModel } from '../villain';

export default function useAddVillain() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: villain => {
      return postAxios<VillainModel>(EndPoints.villains, villain);
    },

    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, variables, context) => {
      if (context?.backup) queryClient.setQueryData<VillainModel[]>([keys.villains], context.backup.data);
    },

    onMutate: async (villain: VillainModel) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: [keys.villains] });

      // Snapshot the previous value
      const backup = queryClient.getQueryData<{ data: VillainModel[] }>([keys.villains]);

      // Optimistically update by adding the villain
      if (backup)
        queryClient.setQueryData<{ data: VillainModel[] }>([keys.villains], {
          data: [...backup.data, villain],
        });

      return { backup };
    },
    // Always refetch after error or success:
    onSettled: () => {
      return queryClient.invalidateQueries({ queryKey: [keys.villains] });
    },
  });
}
