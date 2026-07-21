import express from "express";
import cookieParser from "cookie-parser"
import { pollRoutes } from "./src/modules/poll/poll.route";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./src/modules/auth/auth";

function main() {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());

  app.use("/poll", pollRoutes);
  app.all("/api/auth/*", toNodeHandler(auth));

  app.get("/health", (req, res) => {
    res.json({ ok: true });
  });

  app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
  });
}

main();
