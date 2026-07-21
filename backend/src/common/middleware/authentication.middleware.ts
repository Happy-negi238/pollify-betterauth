import type { NextFunction, Request, Response } from "express";
import ApiError from "../utils/api-erros";
import { verifyToken, type UserPayload } from "../utils/jwt-token";

declare global {
  namespace Express {
    interface Request {
      user: UserPayload;
    }
  }
}

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    throw ApiError.badRequest("Header is not defined");
  }

  if (!authHeader.startsWith("Bearer ")) {
    throw ApiError.badRequest("Bearer does not exist");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw ApiError.badRequest("Token does not exist");
  }

  try {
    const payload = verifyToken(token) as UserPayload;
    req.user = payload;

    next();
  } catch (error) {
    throw ApiError.unauthorized("Client is not authenticated");
  }
};
