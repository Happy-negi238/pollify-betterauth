class ApiError extends Error {
  public statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = "Bad Request"): ApiError {
    return new ApiError(400, message);
  }

  static conflict(message = "Conflict"): ApiError {
    return new ApiError(409, message);
  }

  static InternalServerError(message = "Internal server error"): ApiError {
    return new ApiError(500, message);
  }

  static unauthorized(message = "Unauthorized request"): ApiError {
    return new ApiError(401, message);
  }

  static noContent(message = "No content"): ApiError {
    return new ApiError(204, message);
  }

  static notFound(message = "Not found"): ApiError {
    return new ApiError(404, message);
  }
}

export default ApiError;
