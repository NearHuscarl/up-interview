import { TGeoCodingItem, TGeoCodingResult, TLocation, TLocationResponse } from "./location.dto";

export function mapGeoCodingItemToLocation(geoCodingItem: TGeoCodingItem): TLocation {
  const fullName = [geoCodingItem.admin4, geoCodingItem.admin3, geoCodingItem.admin2, geoCodingItem.admin1]
    .filter(Boolean)
    .join(", ");

  return {
    id: geoCodingItem.id,
    name: geoCodingItem.name,
    fullName,
    countryCode: geoCodingItem.country_code,
    latitude: geoCodingItem.latitude,
    longitude: geoCodingItem.longitude,
  };
}

export function mapGeoCodingResultToLocations(geoCodingResult: TGeoCodingResult): TLocationResponse {
  return {
    results: (geoCodingResult.results ?? []).map(mapGeoCodingItemToLocation),
  };
}
