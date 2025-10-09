import { z } from "zod/v4";

import { TForecastError, TForecastResponse } from "./forecast.dto";
import { isErrorResponse as _isErrorResponse } from "../location/location.validation";

export const ForecastResponse: z.ZodType<TForecastResponse> = z.object({
  elevation: z.number(),
  timezone: z.string().optional(),
  hourly: z.object({
    time: z.array(z.string()),
    temperature_2m: z.array(z.number()),
    showers: z.array(z.number()),
    rain: z.array(z.number()),
  }),
  hourlyUnits: z.object({
    temperature_2m: z.string(),
  }),
});

export const isErrorResponse = (data: unknown): data is TForecastError => _isErrorResponse(data);
