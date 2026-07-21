import express from "express";
import * as controller from "./poll.controller";
import { pollPrivate } from "./poll.middleware";

export const pollRoutes = express.Router();

pollRoutes.post("/poll-create", controller.pollCreateController);
pollRoutes.get(
  "/created-poll/:dashboard_code",
  controller.createdPollController,
);
pollRoutes.get("/poll-vote/:poll_code", pollPrivate, controller.pollVoteGetController);
pollRoutes.post("/poll-vote/:poll_code", pollPrivate, controller.pollVotePostController);
