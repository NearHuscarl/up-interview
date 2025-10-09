import { BrowserRouter, Routes, Route } from "react-router";
import AppLayout from "../features/layout";
import { AuthPage } from "@/features/auth/auth-page";
import { LocationSearchPage } from "@/features/location/location-search-page";
import { ForecastDetailsPage } from "@/features/forecast-details/forecast-details-page";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<LocationSearchPage />} />
          <Route path="register" element={<AuthPage />} />
          <Route path="forecast/:id" element={<ForecastDetailsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
