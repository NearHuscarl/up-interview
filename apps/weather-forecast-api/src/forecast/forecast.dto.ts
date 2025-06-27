export type TForecastError = {
  error: true;
  reason: string;
};

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
