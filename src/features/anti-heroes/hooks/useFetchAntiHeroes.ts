import { useQuery } from "react-query";
import { api, EndPoints } from "../../../axios/api-config";
import { AntiHeroModel } from "../antiHero";

export default function useFetchAntiHeroes() {
  return useQuery("antiHeroes", () =>
    api.get<AntiHeroModel[]>(EndPoints.antiHeroes)
  );
}
