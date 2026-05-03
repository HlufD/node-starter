import {
  ApplicationError,
  HttpStatusCode,
  InternalErrorCode,
} from "@/lib/custome-error.lib.js";
import { ResponseHandler } from "@/lib/Response-handler.lib.js";
import { NextFunction, Request, Response } from "express";

function globalErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof ApplicationError) {
    console.error(err);

    return ResponseHandler.error(
      res,
      err.httpStatusCode,
      err.message,
      err.internalErrorCode,
    );
  }

  return ResponseHandler.error(
    res,
    HttpStatusCode.INTERNAL_SERVER_ERROR,
    err.message || "An unexpected error occurred",
    InternalErrorCode.INTERNAL_SERVER_ERROR,
  );
}

export { globalErrorHandler };
