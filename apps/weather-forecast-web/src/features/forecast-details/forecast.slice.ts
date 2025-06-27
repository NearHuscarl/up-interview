import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ForecastState {
  filter: {
    temperatureUnit: "celsius" | "fahrenheit";
  };
}

const initialState: ForecastState = {
  filter: {
    temperatureUnit: "celsius",
  },
};

export const forecastSlice = createSlice({
  name: "forecast",
  initialState,
  reducers: {
    setTemperatureUnit: (state, action: PayloadAction<ForecastState["filter"]["temperatureUnit"]>) => {
      state.filter.temperatureUnit = action.payload;
    },
  },
});

export const { setTemperatureUnit } = forecastSlice.actions;

export default forecastSlice.reducer;
