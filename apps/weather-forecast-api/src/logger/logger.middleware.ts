import pino from "pino-http";
import pinoPretty from "pino-pretty";
import type { RequestHandler, Response } from "express";

type LogDescriptor = {
  req: Request;
  res: Response;
  responseTime: number;
  [key: string]: unknown;
};

export function loggerMiddleware(): RequestHandler {
  return (req, res, next) => {
    const stream = pinoPretty({
      colorize: true,
      singleLine: true,
      messageFormat: (log, messageKey, _levelLabel, { colors }) => {
        const log2 = log as LogDescriptor;
        return `${log[messageKey]} - ${colors.yellow(log2.res.statusCode)} ${log2.req.method} ${log2.req.url} - ${colors.gray(log2.responseTime + "ms")}`;
      },
    });

    const logger = pino(
      {
        serializers: {
          req(req) {
            req.body = req.raw.body;
            return req;
          },
        },
      },
      stream,
    );

    logger(req, res);
    next();
  };
}
