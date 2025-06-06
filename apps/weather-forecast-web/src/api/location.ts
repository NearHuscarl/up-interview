import { apiClient } from "@/lib/api-client";

export type TLocation = {
  id: number;
  name: string;
  fullName: string;
  countryCode?: string;
  latitude: number;
  longitude: number;
};

export type TLocationResponse = {
  results: TLocation[];
};

export async function getLocations(query: string): Promise<TLocationResponse> {
  return apiClient.get<TLocationResponse>(`/locations?query=${query}`);
}

export async function getLocation(id: number): Promise<TLocation> {
  return apiClient.get<TLocation>(`/locations/${id}`);
}
