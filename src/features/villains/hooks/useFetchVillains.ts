import { useQuery } from "react-query";
import { api, EndPoints } from "../../../axios/api-config";
import { VillainModel } from "../villain";

export default function useFetchVillains() {
  return useQuery("villains", () =>
    api.get<VillainModel[]>(EndPoints.villains)
  );
}
