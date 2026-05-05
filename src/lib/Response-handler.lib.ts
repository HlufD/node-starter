import { Response } from "express";
import { InternalErrorCode, HttpStatusCode } from "./custom-error.lib.js";

export type SuccessResponse<T> = {
  success: true;
  data: T;
  message: string;
};

export type ErrorResponse = {
  success: false;
  message: string;
  code: string;
};

class ResponseHandler {
  static success<T>(
    res: Response,
    data: T,
    message = "Request successful",
    statusCode: HttpStatusCode = HttpStatusCode.OK,
  ) {
    const response: SuccessResponse<T> = {
      success: true,
      data,
      message,
    };

    return res.status(statusCode).json(response);
  }

  static error(
    res: Response,
    statusCode: HttpStatusCode,
    message = "Something went wrong",
    code: InternalErrorCode = InternalErrorCode.INTERNAL_SERVER_ERROR,
  ) {
    const response: ErrorResponse = {
      success: false,
      message,
      code,
    };

    return res.status(statusCode).json(response);
  }
}

export { ResponseHandler };
