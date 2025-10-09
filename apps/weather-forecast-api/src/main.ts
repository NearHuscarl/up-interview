/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from "express";

import { errorMiddleware } from "./error/error.middleware";
import { RegisterRoutes } from "./generated/routes";
import { swaggerMiddleware } from "./swagger/swagger.middleware";
import { loggerMiddleware } from "./logger/logger.middleware";

class App {
  private _app: express.Express;

  constructor() {
    this._app = express();
  }

  middleware() {
    const apiRouter = express.Router();
    RegisterRoutes(apiRouter);

    this._app.use(loggerMiddleware());
    this._app.use("/api", apiRouter);
    this._app.use("/docs", swaggerMiddleware());
    this._app.get("/", (_req, res) => res.redirect(301, "/docs"));
    this._app.use(errorMiddleware());
  }

  run() {
    const port = process.env["WEATHER_FORECAST_API_PORT"] || 3000;
    const server = this._app.listen(port, () => {
      console.log(`Listening at http://localhost:${port}`);
    });
    server.on("error", console.error);
  }

  main() {
    this.middleware();
    this.run();
  }
}

const app = new App();
app.main();
