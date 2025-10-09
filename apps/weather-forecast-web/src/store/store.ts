import { configureStore } from "@reduxjs/toolkit";
import { forecastSlice } from "../features/forecast-details/forecast.slice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    forecast: forecastSlice.reducer,
  },
});
