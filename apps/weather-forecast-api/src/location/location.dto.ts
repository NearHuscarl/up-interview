export type TGeoCodingItem = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  feature_code: string;
  country_code?: string;
  admin1_id?: number;
  admin2_id?: number;
  admin3_id?: number;
  admin4_id?: number;
  timezone?: string;
  population?: number;
  postcodes?: string[];
  country_id?: number;
  country?: string;
  admin1?: string;
  admin2?: string;
  admin3?: string;
  admin4?: string;
};

export type TGeoCodingResult = {
  generationtime_ms: number;
  results?: TGeoCodingItem[];
};

export type TGeoCodingError = {
  error: true;
  reason: string;
};

export type TLocation = {
  /**
   * @isInt we would kindly ask you to provide a number here
   */
  id: number;
  name: string;
  fullName: string;
  /**
   * @example US
   * @pattern ^[A-Z]{2}$ country code should be 2 characters long in uppercase
   */
  countryCode?: string;
  latitude: number;
  longitude: number;
};

export type TLocationResponse = {
  results: TLocation[];
};
