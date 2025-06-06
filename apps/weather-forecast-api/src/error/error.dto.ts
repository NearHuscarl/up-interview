type ErrorDetail = {
  summary: string;
  reason?: string;
  data?: {
    [key: string]: unknown;
  };
  error?: unknown;
};

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    /**
     * Additional details about the error, such as a summary, reason, or any relevant data.
     * Could be sensitive to the client, so handle with care.
     */
    public detail?: ErrorDetail,
    stack?: string,
  ) {
    super(message);
    this.name = "AppError";
    this.stack = stack || new Error().stack;
  }
}

type AppErrorOptions = { statusCode: number; message: string; detail?: ErrorDetail; stack?: string };

export class ClientError extends AppError {
  constructor(options?: Partial<AppErrorOptions>) {
    const { statusCode = 400, message = "Bad Request", detail, stack } = options ?? {};
    super(statusCode, message, detail, stack);
  }
}

export class ServerError extends AppError {
  constructor(options?: Partial<AppErrorOptions>) {
    const { statusCode = 500, message = "Internal Service Error", detail, stack } = options ?? {};
    super(statusCode, message, detail, stack);
  }
}
