import { createServer } from "node:http";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { pollRoutes } from "./src/modules/poll/poll.route";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./src/modules/auth/auth";
import { corsConfig, socketIntializer } from "./src/common/socket";

function main() {
  const app = express();
  const server = createServer(app);

  socketIntializer(server);

  app.use(cors(corsConfig));

  app.all("/api/auth/*splat", toNodeHandler(auth));
  app.use(cookieParser());
  app.use(express.json());

  app.use("/poll", pollRoutes);

  app.get("/health", (req, res) => {
    res.json({ ok: true });
  });

  server.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
  });
}

main();
