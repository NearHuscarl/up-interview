import { Controller, Example, Get, Path, Query, Response, Route } from "tsoa";

import type { TLocation, TLocationResponse } from "./location.dto";
import { LocationService } from "./location.service";
import { ServerError } from "../error/error.dto";

@Route("locations")
export class LocationController extends Controller {
  private _service = new LocationService();

  /**
   * Retrieves a location by its unique ID.
   * @param id - The unique ID of the location.
   */
  @Get("{id}")
  @Example<TLocation>({
    id: 4379545,
    name: "California",
    fullName: "Walker Township, Moniteau, Missouri",
    countryCode: "US",
    latitude: 38.5,
    longitude: -92.7,
  })
  @Response<ServerError>(500, "Internal Server Error", {
    statusCode: 500,
    name: "AppError",
    message: "Internal Service Error",
    detail: {
      summary: "Couldn't get location from Open Meteo with id: 69420xx",
      reason: "Value was not of type 'Int32' at path 'id'. Data found at 'id' was not Int32.",
    },
  })
  async getLocation(@Path() id: number): Promise<TLocation> {
    return this._service.getLocation(id);
  }

  /**
   * Retrieves a list of locations based on the provided query string.
   *
   * @param query - The search query used to filter locations.
   * @returns A promise that contains the matching locations.
   */
  @Get()
  @Example<TLocationResponse>({
    results: [
      {
        id: 4379545,
        name: "California",
        fullName: "Walker Township, Moniteau, Missouri",
        countryCode: "US",
        latitude: 38.5,
        longitude: -92.7,
      },
      {
        id: 3687913,
        name: "California",
        fullName: "California, Santander Department",
        countryCode: "CO",
        latitude: 6.9,
        longitude: -73.1,
      },
    ],
  })
  @Response<ServerError>(500, "Internal Server Error", {
    statusCode: 500,
    name: "AppError",
    message: "Internal Service Error",
    detail: {
      summary: "Couldn't get locations from Open Meteo. Query: pickaboo",
      reason: "Invalid query or service unavailable.",
    },
  })
  async getLocations(@Query() query: string): Promise<TLocationResponse> {
    if (process.env.NODE_ENV === "development" && query === "error-express") {
      // Simulate an error in development mode for testing purposes
      throw new ServerError({
        statusCode: 500,
        message: "Internal Service Error",
        detail: {
          summary: `Something really bad happened with query: ${query}`,
          reason: "A very detailed reason why this error occurred and what to do about it.",
        },
      });
    }
    return this._service.getLocations(query);
  }
}
