import { z } from "zod/v4";

import { TGeoCodingError, TGeoCodingItem, TGeoCodingResult } from "./location.dto";
import { isPlainObject } from "../utils/lang";

export const GeoCodingItem: z.ZodType<TGeoCodingItem> = z.object({
  id: z.number(),
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  elevation: z.number().optional(),
  feature_code: z.string(),
  country_code: z.string().optional(),
  admin1_id: z.number().optional(),
  admin2_id: z.number().optional(),
  admin3_id: z.number().optional(),
  admin4_id: z.number().optional(),
  timezone: z.string().optional(),
  population: z.number().optional(),
  postcodes: z.array(z.string()).optional(),
  country_id: z.number().optional(),
  country: z.string().optional(),
  admin1: z.string().optional(),
  admin2: z.string().optional(),
  admin3: z.string().optional(),
  admin4: z.string().optional(),
});

export const GeoCodingResult: z.ZodType<TGeoCodingResult> = z.object({
  generationtime_ms: z.number(),
  results: z.array(GeoCodingItem).optional(),
});

export function isErrorResponse(error: unknown): error is TGeoCodingError {
  return (
    isPlainObject(error) &&
    "error" in error &&
    (error as TGeoCodingError).error === true &&
    "reason" in error &&
    typeof (error as TGeoCodingError).reason === "string"
  );
}
