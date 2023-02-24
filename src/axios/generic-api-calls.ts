import { api } from './api-config';
import type { EndPointsValues } from './api-config';

export async function getAxios<T>(endpoint: EndPointsValues) {
  return await api.get<T>(`${endpoint}`);
}

export async function deleteAxios<T>(endpoint: EndPointsValues, id: string) {
  return await api.delete<T>(`${endpoint}/${id}`);
}

export async function postAxios<T>(endpoint: EndPointsValues, arg: T) {
  return await api.post<T>(`${endpoint}`, arg);
}

export async function putAxios<RT, BT>(endpoint: EndPointsValues, id: string, arg: BT) {
  return await api.put<RT>(`${endpoint}/${id}`, arg);
}
