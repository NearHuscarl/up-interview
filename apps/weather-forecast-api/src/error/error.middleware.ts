import type { ErrorRequestHandler } from "express";
import { ValidateError } from "tsoa";
import { ZodError } from "zod/v4";

import { AppError } from "./error.dto";
import { tsoaErrorToAppError, zodErrorToAppError } from "./error.mapper";

export function errorMiddleware(): ErrorRequestHandler {
  return (err: unknown, req, res, _next) => {
    try {
      if (err instanceof ValidateError) {
        err = tsoaErrorToAppError(err);
      }
      if (err instanceof ZodError) {
        err = zodErrorToAppError(err);
      }

      if (err instanceof AppError) {
        console.error(
          `[AppError] ${err.statusCode} at ${req.method} ${req.path}:`,
          err.message,
          err.detail,
          "\n",
          err.stack,
        );

        const errorResponse: AppError = {
          name: err.name,
          statusCode: err.statusCode,
          message: err.message,

          detail: err.detail,
          stack: err.stack,
        };

        return void res.status(err.statusCode).json(errorResponse);
      }

      if (err instanceof Error) {
        console.error("Unhandled error:", err.message, "\nStack:", err.stack || "No stack trace available");
        return void res.status(500).json({ message: "Internal Server Error" });
      }

      console.error("New error, yay (said no one)", err);
      return void res.status(500).json({ message: "Unknown error" });
    } catch (error) {
      console.error("[Error Middleware] Failed to process error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
}
