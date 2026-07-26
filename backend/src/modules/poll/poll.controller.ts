import type { Request, Response } from "express";
import type { pollCreateType } from "./poll.types";

import * as service from "./poll.service";
import ApiError from "../../common/utils/api-erros";
import ApiResponse from "../../common/utils/api-response";

type DashboardParams = {
  dashboard_code: string;
};

export function verifyCode(code: string | undefined, message: string) {
  if (!code) {
    throw ApiError.unauthorized(message);
  }

  return;
}

export const pollCreateController = async (
  req: Request<{}, {}, pollCreateType>,
  res: Response,
) => {
  const userId = req.user.id;

  if (!userId) {
    throw ApiError.badRequest("No user found");
  }

  const { title, durationSeconds, question, visibility, description, answers } =
    req.body;

  const result = await service.pollCreateService(
    {
      title,
      durationSeconds,
      question,
      visibility,
      description,
      answers,
    },
    userId,
  );

  ApiResponse.ok(res, 201, result, "Poll created successfully!");
};

export const pollDetailController = async (
  req: Request<DashboardParams>,
  res: Response,
) => {
  const { dashboard_code } = req.params;

  verifyCode(dashboard_code, "Unauthorized request");

  const response = await service.pollDetailService(dashboard_code);
  const { result } = response;

  ApiResponse.ok(res, 200, result, "Poll detail fetch successfully");
};

export const pollVoteGetController = async (req: Request, res: Response) => {
  const { id, title, description, visibility, status,question } = req.questionData;

  const result = await service.pollVoteGetService({
    id,
    title,
    description,
    visibility,
    status,
    question
  });

  ApiResponse.ok(res, 200, result, "Fetch successfully questions and answer");
};

export const pollVotePostController = async (req: Request, res: Response) => {
  const { id } = req.questionData;
  const body: { answerId: string } | null = req.body;

  if (!body) {
    throw ApiError.badRequest("Id is not found");
  }

  const result = await service.pollVotePostService(id, body);
  ApiResponse.ok(res, 200, result, "Count updated successfully");
};

export const dashboardController = async (req: Request, res: Response) => {
  const { id }: { id: string } = req.user;

  verifyCode(id, "Unauthorized request");

  const response = await service.dashboardService(id);
  ApiResponse.ok(res, 200, response, "Data found successfully");
};
