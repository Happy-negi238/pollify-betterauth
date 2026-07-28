import crypto from "node:crypto";
import { desc, eq, sql } from "drizzle-orm";

import type { pollCreateType } from "./poll.types";
import { db } from "../../index";
import { answers, question } from "../../common/db/schema";
import ApiError from "../../common/utils/api-erros";
import { user } from "../../common/db";
import { getIO } from "../../common/socket";

const RANDOMBYTES_LENGTH = 8;
const FRONTEND_URL = process.env.FRONTEND_URL ?? "http://localhost:5173";

function generateUrl(code: string) {
  return `${FRONTEND_URL}/${code}`;
}

export const pollCreateService = async (
  data: pollCreateType,
  userId: string,
) => {
  const DASHBOARD_CODE = crypto.randomBytes(RANDOMBYTES_LENGTH).toString("hex");
  const POLL_CODE = crypto.randomBytes(RANDOMBYTES_LENGTH).toString("hex");

  const dashboardCodeUrl = generateUrl(DASHBOARD_CODE);
  const expireAt = new Date(Date.now() + data.durationSeconds * 1000);

  try {
    return await db.transaction(async (poll) => {
      const [pollCreate] = await poll
        .insert(question)
        .values({
          title: data.title,
          expireAt,
          description: data.description,
          question: data.question,
          visibility: data.visibility,
          userId: userId,
          dashboardCode: DASHBOARD_CODE,
          pollCode: POLL_CODE,
        })
        .returning();

      if (!pollCreate) {
        throw ApiError.InternalServerError(
          "An internal error occurred while processing insertion",
        );
      }

      const answerInsert = await poll
        .insert(answers)
        .values(
          data.answers.map((answer) => ({
            questionId: pollCreate.id,
            title: answer.title,
            isCorrect: answer.isCorrect,
          })),
        )
        .returning();

      if (answerInsert.length !== data.answers.length) {
        throw ApiError.InternalServerError(
          "An internal error occurred while processing insertion",
        );
      }

      const io = getIO();

      io.emit("server:poll:created", { id: pollCreate.id });

      return {
        success: true,
        pollCreateId: pollCreate.id,
        dashboardCode: pollCreate.dashboardCode,
      };
    });
  } catch (error) {
    throw ApiError.InternalServerError(
      "An internal error occurred while inserting question and answer",
    );
  }
};

export const pollDetailService = async (dashboardCode: string) => {
  const [result] = await db
    .select({
      id: question.id,
      pollCode: question.pollCode,
      duration: question.expireAt,
      title: question.title,
      description: question.description,
      visibility: question.visibility,
    })
    .from(question)
    .where(eq(question.dashboardCode, dashboardCode));

  if (!result) {
    throw ApiError.badRequest("An error occour to finding poll");
  }

  const answerData = await db
    .select({
      id: answers.id,
      title: answers.title,
      votes: answers.votes,
    })
    .from(answers)
    .where(eq(answers.questionId, result.id));

  if (answerData.length < 1) {
    throw ApiError.badRequest("Unable to fetch the answers");
  }

  const pollData = {
    id: result.id,
    pollCode: result.pollCode,
    duration: result.duration,
    title: result.title,
    description: result.description,
    visibility: result.visibility,
    answers: answerData,
  };

  return { result: pollData };
};

export const pollVoteGetService = async (questionData: {
  id: string;
  title: string;
  description: string | null;
  visibility: string;
  status: "live" | "ended";
  question: string;
}) => {
  // const [questionData] = await db
  //   .select()
  //   .from(question)
  //   .where(eq(question.pollCode, pollCode));

  // if (!questionData) {
  //   throw ApiError.InternalServerError("Error to getting poll");
  // }

  // if (questionData.expireAt < new Date()) {
  //   throw ApiError.badRequest("Poll is expired");
  // }

  // if(questionData.visibility === "private"){
  //   authentication(req: Request, res: Response, next: NextFunction)
  // }

  const answerData = await db
    .select({
      id: answers.id,
      questionId: answers.questionId,
      title: answers.title,
      isCorrect: answers.isCorrect,
    })
    .from(answers)
    .where(eq(answers.questionId, questionData.id));

  if (answerData.length === 0) {
    throw ApiError.InternalServerError("Failed to get answers");
  }

  return {
    question: {
      title: questionData.title,
      description: questionData.description,
      visibility: questionData.visibility,
      status: questionData.status,
      question: questionData.question,
    },

    answers: answerData,
  };
};

export const pollVotePostService = async (
  id: string,
  body: { answerId: string },
) => {
  try {
    const answerId = body.answerId;

    const [updateVote] = await db
      .update(answers)
      .set({ votes: sql`${answers.votes} + 1` })
      .where(eq(answers.id, answerId))
      .returning({
        id: answers.id,
        votes: answers.votes,
        title: answers.title,
      });

    if (!updateVote) {
      throw ApiError.badRequest("Unauthorized vote count");
    }

    const io = getIO();
    console.log("updated");
    // console.log("io: ", io);

    io.emit("server:poll:updated", {
      updatedAnswer: updateVote,
    });

    return { id: updateVote.id, votes: updateVote.votes };
  } catch (error) {
    throw ApiError.InternalServerError("Error to count vote");
  }
};

export const dashboardService = async (id: string) => {
  const [userDetail] = await db.select().from(user).where(eq(user.id, id));

  if (!userDetail) {
    throw ApiError.unauthorized("User not found");
  }

  const pollDetail = await db
    .select()
    .from(question)
    .where(eq(question.userId, id))
    .orderBy(desc(question.createdAt));

  const result = pollDetail.length > 0 ? pollDetail : null;
  return { result };
};
