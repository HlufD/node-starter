export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,

  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  NOT_MODIFIED = 304,

  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
  GONE = 410,
  LENGTH_REQUIRED = 411,
  PAYLOAD_TOO_LARGE = 413,
  UNSUPPORTED_MEDIA_TYPE = 415,
  UNPROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUESTS = 429,

  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}

export enum InternalErrorCode {
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  BAD_REQUEST = "BAD_REQUEST",
  NOT_FOUND = "NOT_FOUND",
}

class ApplicationError extends Error {
  public readonly httpStatusCode: HttpStatusCode;
  public readonly isOperational: boolean;
  public readonly internalErrorCode: InternalErrorCode;

  constructor(
    httpStatusCode: HttpStatusCode,
    message: string,
    isOperational = true,
    internalErrorCode: InternalErrorCode = InternalErrorCode.INTERNAL_SERVER_ERROR,
  ) {
    super(message);
    // this is a safety for older node and js versions like (below 16)
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = this.constructor.name;
    this.httpStatusCode = httpStatusCode;
    this.isOperational = isOperational;
    this.internalErrorCode = internalErrorCode;

    //Remove noise from stack traces so you only see the real origin of the error.
    Error.captureStackTrace(this, this.constructor);
  }
}

class BadRequestError extends ApplicationError {
  constructor(message = "Bad Request") {
    super(HttpStatusCode.BAD_REQUEST, message);
  }
}

class NotFoundError extends ApplicationError {
  constructor(message = "Not Found") {
    super(HttpStatusCode.NOT_FOUND, message);
  }
}

class InternalServerError extends ApplicationError {
  constructor(message = "Internal Server Error") {
    super(HttpStatusCode.INTERNAL_SERVER_ERROR, message, false);
  }
}

class ConflictError extends ApplicationError {
  constructor(message = "Conflict") {
    super(HttpStatusCode.CONFLICT, message);
  }
}

class UnauthorizedError extends ApplicationError {
  constructor(message = "Unauthorized") {
    super(HttpStatusCode.UNAUTHORIZED, message);
  }
}

class ForbiddenError extends ApplicationError {
  constructor(message = "Forbidden") {
    super(HttpStatusCode.FORBIDDEN, message);
  }
}

export {
  ApplicationError,
  BadRequestError,
  NotFoundError,
  InternalServerError,
  ConflictError,
  UnauthorizedError,
  ForbiddenError,
};
