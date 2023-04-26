import { useMutation, useQueryClient } from 'react-query';
import { EndPoints } from '../../../axios/api-config';
import { putAxios } from '../../../axios/generic-api-calls';
import { keys } from '../../keyNames';
import type { VillainModel } from '../villain';

export default function useUpdateVillain() {
  const queryClient = useQueryClient();
  
  return useMutation(
    villain => {
      return putAxios<VillainModel, VillainModel>(EndPoints.villains, villain.id, villain);
    },
    {
      // eslint-disable-next-line autofix/no-unused-vars
      onMutate: async (villain: VillainModel) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries([keys.villains]);

        // Snapshot the previous value
        const backup = queryClient.getQueryData<{ data: VillainModel[] }>([keys.villains]);

        // Optimistically update by updating the villain
        // if (backup)
        //   queryClient.setQueryData<{ data: VillainModel[] }>([keys.villains] {
        //     data: [
        //       ...backup.data.map(v => (v.id === villain.id ? villain : v)),
        //     ]});

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
