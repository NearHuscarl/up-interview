import type { RequestHandler } from "express";
import swaggerUi from "swagger-ui-express";

export function swaggerMiddleware(): RequestHandler[] {
  return [
    ...swaggerUi.serve,
    async (_req, res) => {
      return void res.send(swaggerUi.generateHTML(await import("../generated/swagger.json")));
    },
  ];
}
