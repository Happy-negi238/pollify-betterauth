import type { NextFunction, Request, Response } from "express";
import { verifyCode } from "./poll.controller";

import ApiError from "../../common/utils/api-erros";
import { verifyToken } from "../../common/utils/jwt-token";
import { question } from "../../common/db/schema";
import { eq } from "drizzle-orm";
import { db } from "../..";
import type { UserPayload } from "../../common/types";

export type PollParams = {
  poll_code: string;
}

export const pollPrivate = async (
  req: Request<PollParams>,
  res: Response,
  next: NextFunction,
) => {
  const { poll_code } = req.params;

  verifyCode(poll_code, "Unauthorized poll code");

  const [questionData] = await db
    .select()
    .from(question)
    .where(eq(question.pollCode, poll_code));

  if (!questionData) {
    throw ApiError.InternalServerError("Error to getting poll");
  }

  if (questionData.expireAt < new Date() || questionData.status === "ended") {
    throw ApiError.badRequest("Poll is expired");
  }

  if (questionData.visibility === "private") {
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
      verifyToken(token) as UserPayload;
      req.questionData = questionData;
      next();
    } catch (error) {
      throw ApiError.unauthorized("Client is not authenticated");
    }
  } else {
    req.questionData = questionData;
    next();
  }
};
