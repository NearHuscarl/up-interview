import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { AppRouter } from "./providers/app-router";
import { QueryProvider } from "./providers/query-provider";
import { Toaster } from "@shared/ui-base/toaster";
import { StoreProvider } from "./providers/store-provider";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    <StoreProvider>
      <QueryProvider>
        <AppRouter />
        <Toaster />
      </QueryProvider>
    </StoreProvider>
  </StrictMode>,
);
