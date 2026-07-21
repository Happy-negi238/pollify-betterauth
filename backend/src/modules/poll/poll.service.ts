import crypto from "node:crypto";

import type { pollCreateType } from "./poll.types";
import { db } from "../../index";
import { answers, question } from "../../common/db/schema";
import ApiError from "../../common/utils/api-erros";
import { eq, type InferSelectModel } from "drizzle-orm";

const RANDOMBYTES_LENGTH = 8;
const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

type Question = InferSelectModel<typeof question>;
type Answers = Omit<
  InferSelectModel<typeof answers>,
  "votes" | "createdAt" | "updatedAt"
>;

const pollQuestionCache = new Map<string, Question>();
const pollAnswerCache = new Map<string, Answers[]>();

function generateUrl(code: string) {
  return `${BASE_URL}/${code}`;
}

export const pollCreateService = async (
  data: pollCreateType,
  userId: string,
) => {
  const DASHBOARD_CODE = crypto.randomBytes(RANDOMBYTES_LENGTH).toString("hex");
  const POLL_CODE = crypto.randomBytes(RANDOMBYTES_LENGTH).toString("hex");

  const dashboardCodeUrl = generateUrl(DASHBOARD_CODE);
  const expireAt = new Date(Date.now() + data.expireAt * 1000);

  try {
    await db.transaction(async (poll) => {
      const [pollCreate] = await poll
        .insert(question)
        .values({
          title: data.title,
          expireAt,
          description: data.description,
          status: data.status,
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

      return {
        success: true,
        pollCreateId: pollCreate.id,
        url: dashboardCodeUrl,
      };
    });
  } catch (error) {
    throw ApiError.InternalServerError(
      "An internal error occurred while inserting question and answer",
    );
  }
};

export const createdPollService = async (dashboardCode: string) => {
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

  const POLL_CODE = result.pollCode;

  const pollUrl = generateUrl(POLL_CODE);

  return { success: true, url: pollUrl, visibility: result.visibility };
};

export const pollVoteGetService = async (pollCode: string) => {
  const [questionData] = await db
    .select()
    .from(question)
    .where(eq(question.pollCode, pollCode));

  if (!questionData) {
    throw ApiError.InternalServerError("Error to getting poll");
  }

  if (questionData.expireAt < new Date()) {
    throw ApiError.badRequest("Poll is expired");
  }

  if(questionData.visibility === "private"){
    
  }

  pollQuestionCache.set(pollCode, questionData);

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

  pollAnswerCache.set(pollCode, answerData);

  return {
    success: true,
    question: {
      title: questionData.title,
      description: questionData.description,
      visibility: questionData.visibility,
    },

    answers: answerData,
  };
};

export const pollVotePostService = async (pollCode: string, body: [{}]) => {

  // const pollQuestion = pollQuestionCache.get(pollCode);
  // const pollAnswer = pollAnswerCache.get(pollCode);
  
  // if (pollQuestion !== undefined && pollAnswer !== undefined) {
    
  // }


};
