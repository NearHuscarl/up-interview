import { ValidateError } from "tsoa";
import { z, ZodError } from "zod/v4";

import { AppError, ClientError, ServerError } from "./error.dto";

export function tsoaErrorToAppError(error: unknown): AppError {
  if (error instanceof ValidateError) {
    return new ClientError({
      statusCode: error.status,
      message: error.message || "Validation failed",
      detail: {
        summary: "tsoa: Validation failed when processing http request",
        data: error.fields,
      },
    });
  }

  throw new ServerError({
    message: "Couldn't process the error",
    detail: { summary: "tsoaErrorToAppError", error },
  });
}

export function zodErrorToAppError(error: unknown): AppError {
  if (error instanceof ZodError) {
    return new ServerError({
      detail: {
        summary: "zod: Validation failed",
        reason: z.prettifyError(error),
        data: z.treeifyError(error),
      },
    });
  }

  throw new ServerError({
    message: "Couldn't process the error",
    detail: { summary: "zodErrorToAppError", error },
  });
}
