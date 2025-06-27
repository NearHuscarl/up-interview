import { apiClient } from "@/lib/api-client";

export type TForecastResponse = {
  elevation: number;
  timezone?: string;
  hourly: {
    time: string[];
    temperature_2m: number[];
    showers: number[];
    rain: number[];
  };
  hourlyUnits: {
    temperature_2m: string;
  };
};

export async function getForecast(
  latitude: number,
  longitude: number,
  temperatureUnit: string,
): Promise<TForecastResponse> {
  return apiClient.get<TForecastResponse>(
    `/forecast?latitude=${latitude}&longitude=${longitude}&temperatureUnit=${temperatureUnit}`,
  );
}
