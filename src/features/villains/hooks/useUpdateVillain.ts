import { useMutation } from 'react-query';
import { api, EndPoints } from '../../../axios/api-config';
import { queryClient } from '../../../../src/App';
import { VillainModel } from '../villain';

export default function useUpdateVillain() {
  return useMutation(
    villain =>
      api.post<VillainModel>(`${EndPoints.villains}/${villain.id}`, villain),
    {
      onMutate: async (villain: VillainModel) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries('villains');

        // Snapshot the previous value
        const backup =
          queryClient.getQueryData<{ data: VillainModel[] }>('villains');

        // Optimistically update by updating the villain
        if (backup)
          queryClient.setQueryData<{ data: VillainModel[] }>('villains', {
            data: [
              ...backup.data.map(v => (v.id === villain.id ? villain : v)),
            ],
          });

        return { backup };
      },

      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (err, variables, context) => {
        if (context?.backup)
          queryClient.setQueryData<VillainModel[]>(
            'villains',
            context.backup.data,
          );
      },
      // Always refetch after error or success:
      onSettled: () => queryClient.invalidateQueries('villains'),
    },
  );
}
