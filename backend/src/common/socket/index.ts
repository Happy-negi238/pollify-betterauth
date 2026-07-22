import type { Server as HttpServer } from "node:http";
import { Server } from "socket.io";
import ApiError from "../utils/api-erros";
import dotenv from "dotenv";
dotenv.config();

let io: Server;

export const corsConfig = {
  origin: process.env.FRONTEND_URL ?? `http://localhost:5173`,
  credentials: true,
};

export const socketIntializer = (server: HttpServer) => {
  io = new Server(server, {
    cors: corsConfig,
  });

  io.on("connection", (socket) => {
    console.log(`Socket id: ${socket.id}`);
  });

  return io;
};

export function getIO() {
  if (!io) {
    throw ApiError.InternalServerError("Socket is not initialized");
  }

  return io;
}
