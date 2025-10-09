import { PayloadAction } from "@reduxjs/toolkit";

export interface ForecastState {
  filter: {
    temperatureUnit: "celsius" | "fahrenheit";
  };
}

export const SET_TEMPERATURE_UNIT = "forecast/SET_TEMPERATURE_UNIT" as const;

export const setTemperatureUnit = (unit: ForecastState["filter"]["temperatureUnit"]) => ({
  type: SET_TEMPERATURE_UNIT,
  payload: unit,
});

const initialState: ForecastState = {
  filter: {
    temperatureUnit: "celsius",
  },
};

export function forecastReducer(state = initialState, action: PayloadAction): ForecastState {
  switch (action.type) {
    case SET_TEMPERATURE_UNIT:
      return state;
    default:
      return state;
  }
}
