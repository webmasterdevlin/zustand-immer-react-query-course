import { useMutation } from 'react-query';
import { queryClient } from '../../../App';
import { EndPoints } from '../../../axios/api-config';
import { deleteAxios } from '../../../axios/generic-api-calls';
import { keys } from '../../keyNames';
import type { VillainModel } from '../villain';

export default function useRemoveVillain() {
  return useMutation(
    villainId => {
      return deleteAxios<void>(EndPoints.villains, villainId);
    },
    {
      onMutate: async (villainId: string) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries([keys.villains]);

        // Snapshot the previous value
        const backup = queryClient.getQueryData<{ data: VillainModel[] }>([keys.villains]);

        // Optimistically update by removing the villain
        if (backup)
          queryClient.setQueryData<{ data: VillainModel[] }>([keys.villains], {
            data: [
              ...backup.data.filter(v => {
                return v.id !== villainId;
              }),
            ],
          });

        return { backup };
      },

      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (err, variables, context) => {
        if (context?.backup) queryClient.setQueryData<VillainModel[]>([keys.villains], context.backup.data);
      },
      // Always refetch after error or success:
      onSettled: () => {
        return queryClient.invalidateQueries([keys.villains]);
      },
    },
  );
}
