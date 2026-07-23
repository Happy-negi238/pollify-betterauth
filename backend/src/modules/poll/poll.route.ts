import express from "express";
import * as controller from "./poll.controller";
import { pollPrivate } from "./poll.middleware";
import { authentication } from "../../common/middleware/authentication.middleware";

export const pollRoutes = express.Router();

pollRoutes.post(
  "/poll-create",
  authentication,
  controller.pollCreateController,
);
pollRoutes.get(
  "/created-poll/:dashboard_code",
  authentication,
  controller.createdPollController,
);
pollRoutes.get(
  "/poll-vote/:poll_code",
  authentication,
  pollPrivate,
  controller.pollVoteGetController,
);
pollRoutes.post(
  "/poll-vote/:poll_code",
  authentication,
  pollPrivate,
  controller.pollVotePostController,
);
