import chalk from "chalk";
import { TLocation, TLocationResponse } from "./location.dto";
import { mapGeoCodingItemToLocation, mapGeoCodingResultToLocations } from "./location.mapper";
import { GeoCodingItem, GeoCodingResult, isErrorResponse } from "./location.validation";
import { ServerError } from "../error/error.dto";

export class LocationService {
  #apiVersion = "v1";
  private _baseUrl = `https://geocoding-api.open-meteo.com/${this.#apiVersion}`;

  async getLocation(id: number): Promise<TLocation> {
    const url = new URL(this._baseUrl);
    url.pathname += "/get";
    url.searchParams.append("id", id.toString());

    const res = await fetch(url.toString());
    const geoCodingItem = await res.json();

    if (isErrorResponse(geoCodingItem)) {
      throw new ServerError({
        detail: {
          summary: `Couldn't get location from Open Meteo with id: ${chalk.yellow(id)}`,
          reason: geoCodingItem.reason,
        },
      });
    }

    const validated = GeoCodingItem.parse(geoCodingItem);
    return mapGeoCodingItemToLocation(validated);
  }

  async getLocations(query: string): Promise<TLocationResponse> {
    const url = new URL(this._baseUrl);
    url.pathname += "/search";
    url.searchParams.append("name", query);

    const res = await fetch(url.toString());
    const geocodingResult = await res.json();

    if (isErrorResponse(geocodingResult)) {
      throw new ServerError({
        detail: {
          summary: `Couldn't get locations from Open Meteo. Query: ${chalk.green(query)}`,
          reason: geocodingResult.reason,
        },
      });
    }

    const validated = GeoCodingResult.parse(geocodingResult);
    return mapGeoCodingResultToLocations(validated);
  }
}
