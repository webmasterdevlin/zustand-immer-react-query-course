import { useMutation } from 'react-query';
import { api, EndPoints } from '../../../axios/api-config';
import { queryClient } from '../../../../src/App';
import { VillainModel } from '../villain';
import { keys } from '../../keyNames';

export default function useAddVillain() {
  return useMutation(
    villain => api.post<VillainModel>(EndPoints.villains, villain),
    {
      onMutate: async (villain: VillainModel) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries([keys.villains]);

        // Snapshot the previous value
        const backup = queryClient.getQueryData<{ data: VillainModel[] }>([
          keys.villains,
        ]);

        // Optimistically update by adding the villain
        if (backup)
          queryClient.setQueryData<{ data: VillainModel[] }>([keys.villains], {
            data: [...backup.data, villain],
          });

        return { backup };
      },

      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (err, variables, context) => {
        if (context?.backup)
          queryClient.setQueryData<VillainModel[]>(
            [keys.villains],
            context.backup.data,
          );
      },
      // Always refetch after error or success:
      onSettled: () => queryClient.invalidateQueries([keys.villains]),
    },
  );
}
