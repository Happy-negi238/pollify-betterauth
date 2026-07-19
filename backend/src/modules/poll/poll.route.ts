import express from "express";
import * as controller from "./poll.controller";

const pollRoutes = express.Router();

pollRoutes.post("/poll-create", controller.pollCreateController);
pollRoutes.get(
  "/created-poll/:dashboard_code",
  controller.createdPollController,
);
pollRoutes.get("/poll-vote/:poll_code", controller.pollVoteGetController);
pollRoutes.post("/poll-vote/:poll_code", controller.pollVotePostController)