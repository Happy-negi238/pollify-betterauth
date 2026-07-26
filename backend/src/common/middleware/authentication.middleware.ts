import type { NextFunction, Request, Response } from "express";
import { auth } from "../../modules/auth/auth";
import ApiError from "../utils/api-erros";

export async function getSession(req: Request) {
  const headers = new Headers();

  for (const [key, value] of Object.entries(req.headers)) {
    if (typeof value === "string") {
      headers.set(key, value);
    } else if (Array.isArray(value)) {
      headers.set(key, value.join(", "));
    }
  }

  return auth.api.getSession({ headers });
}

export async function authentication(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const session = await getSession(req);

  if (!session) {
    throw ApiError.unauthorized("Unauthorized request");
  }

  req.user = session.user;

  next();
}
