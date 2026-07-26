import type { NextFunction, Request, Response } from "express";
import { verifyCode } from "./poll.controller";

import ApiError from "../../common/utils/api-erros";
import { question } from "../../common/db/schema";
import { eq } from "drizzle-orm";
import { db } from "../..";
import { getSession } from "../../common/middleware/authentication.middleware";

export type PollParams = {
  poll_code: string;
};

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
    const session = await getSession(req);
    
    if (!session) {
      throw ApiError.unauthorized("Unauthorized request");
    }

    req.questionData = questionData;
    next();
  } else {
    req.questionData = questionData;
    next();
  }
};
