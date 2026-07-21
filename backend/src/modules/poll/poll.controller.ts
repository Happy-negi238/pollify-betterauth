import type { Request, Response } from "express";
import type { pollCreateType } from "./poll.types";

import * as service from "./poll.service";
import ApiError from "../../common/utils/api-erros";
import ApiResponse from "../../common/utils/api-response";

interface DashboardParams {
  dashboard_code: string;
}
interface PollParams {
  poll_code: string;
}

function verifyCode(code: string | undefined, message: string) {
  if (!code) {
    throw ApiError.unauthorized(message);
  }

  return;
}

export const pollCreateController = async (
  req: Request<{}, {}, pollCreateType>,
  res: Response,
) => {
  const userId = req.cookies.userId;

  if (!userId) {
    throw ApiError.badRequest("No user found");
  }

  const { title, expireAt, status, visibility, description, answers } =
    req.body;

  const result = await service.pollCreateService(
    {
      title,
      expireAt,
      status,
      visibility,
      description,
      answers,
    },
    userId,
  );

  return ApiResponse.ok(res, 201, result, "Poll created successfully!");
};

export const createdPollController = async (
  req: Request<DashboardParams>,
  res: Response,
) => {
  const { dashboard_code } = req.params;

  verifyCode(dashboard_code, "Unauthorized request");

  const result = service.createdPollService(dashboard_code);

  return ApiResponse.ok(res, 200, result, "Poll url created");
};

export const pollVoteGetController = async (
  req: Request<PollParams>,
  res: Response,
) => {
  const { poll_code } = req.params;

  verifyCode(poll_code, "Unauthorized poll code");

  const result = service.pollVoteGetService(poll_code);
  return ApiResponse.ok(
    res,
    200,
    result,
    "Fetch successfully questions and answer",
  );
};

export const pollVotePostController = async (
  req: Request<PollParams>,
  res: Response,
) => {
  const { poll_code } = req.params;
  const body: [{}] | null = req.body;

  verifyCode(poll_code, "Unauthorized poll code");

  if (!body) {
    throw ApiError.badRequest("Data is not found");
  }

  const result = service.pollVotePostService(poll_code, body);
};
