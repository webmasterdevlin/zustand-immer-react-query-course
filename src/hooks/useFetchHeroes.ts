import { useQuery } from "react-query";
import { api, EndPoints } from "../axios/api-config";
import { HeroModel } from "../models/hero";

export default function useFetchHeroes() {
  return useQuery("heroes", () => api.get<HeroModel[]>(EndPoints.heroes));
}
