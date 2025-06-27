import { Controller, Example, Get, Query, Response, Route } from "tsoa";

import type { TForecastResponse } from "./forecast.dto";
import { ForecastService } from "./forecast.service";
import { ServerError } from "../error/error.dto";

@Route("forecast")
export class ForecastController extends Controller {
  private _service = new ForecastService();

  /**
   * Get the weather forecast for a given latitude and longitude.
   */
  @Get()
  @Example<TForecastResponse>({
    elevation: 46,
    hourly: {
      time: [
        "2025-06-03T00:00:00.000Z",
        "2025-06-03T01:00:00.000Z",
        "2025-06-03T02:00:00.000Z",
        "2025-06-03T03:00:00.000Z",
        "2025-06-03T04:00:00.000Z",
        "2025-06-03T05:00:00.000Z",
      ],
      temperature_2m: [
        15.443499565124512, 15.343500137329102, 14.843500137329102, 14.393499374389648, 13.943499565124512,
        14.243499755859375,
      ],
      rain: [0, 0, 0, 1.100000023841858, 12.700000762939453, 1.4000000953674316],
      showers: [0.1, 0.2, 0.15, 0, 0.05, 0.1],
    },
    hourlyUnits: {
      temperature_2m: "°C",
    },
  })
  @Response<ServerError>(500, "Internal Server Error", {
    statusCode: 500,
    name: "AppError",
    message: "Internal Service Error",
    detail: {
      summary:
        'Couldn\'t get forecast from Open Meteo: {"latitude":2,"longitude":233232,"hourly":["temperature_2m","rain"]}',
      reason: "Longitude must be in range of -180 to 180°. Given: 233232.0.",
    },
  })
  async getForecast(
    @Query() latitude: number,
    @Query() longitude: number,
    @Query() temperatureUnit: string,
  ): Promise<TForecastResponse> {
    return this._service.getTemperatureForecast(latitude, longitude, temperatureUnit);
  }
}
