import { useMutation } from "react-query";
import { api, EndPoints } from "axios/api-config";
import { queryClient } from "App";
import { HeroModel } from "../hero";

export default function useUpdateHero() {
  return useMutation(
    (hero) => api.post<HeroModel>(`${EndPoints.heroes}/${hero.id}`, hero),
    {
      onMutate: async (hero: HeroModel) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries("heroes");

        // Snapshot the previous value
        const backup = queryClient.getQueryData<{ data: HeroModel[] }>(
          "heroes"
        );

        // Optimistically update by removing the hero
        if (backup)
          queryClient.setQueryData<{ data: HeroModel[] }>("heroes", {
            data: [...backup.data.map((h) => (h.id === hero.id ? hero : h))],
          });

        return { backup };
      },

      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (err, variables, context) => {
        if (context?.backup)
          queryClient.setQueryData<HeroModel[]>("heroes", context.backup.data);
      },
      // Always refetch after error or success:
      onSettled: () => queryClient.invalidateQueries("heroes"),
    }
  );
}
