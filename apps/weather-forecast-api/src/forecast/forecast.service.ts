import { fetchWeatherApi } from "openmeteo";
import range from "lodash/range";
import { TForecastResponse } from "./forecast.dto";
import { ForecastResponse, isErrorResponse } from "./forecast.validation";
import { ServerError } from "../error/error.dto";

type VariableWithTime = { time: () => any; interval: () => any };

export class ForecastService {
  private _baseUrl = `https://api.open-meteo.com/v1/forecast`;

  private toDateString(variableWithTime: VariableWithTime, i: number, utcOffsetSeconds: number): string {
    return new Date(
      (Number(variableWithTime.time()) + i * variableWithTime.interval() + utcOffsetSeconds) * 1000,
    ).toISOString();
  }

  async getTemperatureForecast(
    latitude: number,
    longitude: number,
    temperatureUnit: string,
  ): Promise<TForecastResponse> {
    const params = {
      latitude,
      longitude,
      hourly: ["temperature_2m", "rain", "showers"],
      forecast_days: 5,
      temperature_unit: temperatureUnit,
    };

    try {
      console.log(`Fetching forecast with params: ${JSON.stringify(params)}`);
      const apiResponses = await fetchWeatherApi(this._baseUrl, params);

      console.log(`Received ${apiResponses.length} responses from Open Meteo API. Transforming data...`);

      const apiResponse = apiResponses.find((response) => response.timezone()) ?? apiResponses[0];
      const hourly = apiResponse.hourly()!;
      const utcOffsetSeconds = apiResponse.utcOffsetSeconds();

      const temperature_2m = [...hourly.variables(0)!.valuesArray()!];
      const rain = [...hourly.variables(1)!.valuesArray()!];
      const showers = [...hourly.variables(2)!.valuesArray()!];
      const time = range(temperature_2m.length).map((i) => this.toDateString(hourly, i, utcOffsetSeconds));

      const response: TForecastResponse = {
        elevation: apiResponse.elevation(),
        timezone: apiResponse.timezone() ?? undefined,
        hourly: { temperature_2m, showers, rain, time },
        hourlyUnits: {
          temperature_2m: "°C",
        },
      };

      return ForecastResponse.parse(response);
    } catch (error) {
      throw new ServerError({
        detail: {
          summary: `Couldn't get forecast from Open Meteo: ${JSON.stringify(params)}`,
          reason: error instanceof Error ? error.message : String(error),
        },
      });
    }
  }
}
