import { useMemo } from "react";
import { useFetch } from "../../lib/hooks/use-fetch";
import { getForecast } from "../../api/forecast";

export function useWeatherForecast(longitude?: number, latitude?: number, temperatureUnit?: "celsius" | "fahrenheit") {
  const params = useMemo(
    () => ({ longitude, latitude, temperatureUnit, forecastDays: 7 /* TODO: implement */ }),
    [longitude, latitude, temperatureUnit],
  );
  return useFetch({
    params,
    fetch: () => getForecast(latitude!, longitude!, temperatureUnit!),
    enabled: Boolean(longitude && latitude && temperatureUnit),
  });
}
