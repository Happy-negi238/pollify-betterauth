import type { Response } from "express";

export default class ApiResponse {
  static ok(
    res: Response,
    statusCode: number = 200,
    data: unknown = null,
    message: string = "successfully done!",
  ) {
    return res.status(statusCode).json({
      message,
      data,
    });
  }
}
