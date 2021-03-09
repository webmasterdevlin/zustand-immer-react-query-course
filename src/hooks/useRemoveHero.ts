import { useMutation } from "react-query";
import { api, EndPoints } from "../axios/api-config";
import { queryClient } from "../App";
import { HeroModel } from "../models/hero";

export default function useRemoveHero() {
  console.log("hello");
  return useMutation(
    (heroId) => api.delete<void>(`${EndPoints.heroes}/${heroId}`),
    {
      onMutate: async (heroId: string) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries("heroes");

        // Snapshot the previous value
        const backup = queryClient.getQueryData<{ data: HeroModel[] }>(
          "heroes"
        );
        console.log("backup:", backup);

        // Optimistically update by removing the hero
        if (backup) {
          queryClient.setQueryData<HeroModel[]>("heroes", [
            ...backup.data.filter((h) => h.id !== heroId),
          ]);
        }

        return { backup };
      },

      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (err, variables, context) => {
        if (context?.backup) {
          queryClient.setQueryData<HeroModel[]>("heroes", context.backup.data);
        }
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries("heroes");
      },
    }
  );
}
