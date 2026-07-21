import jwt from "jsonwebtoken";
import ApiError from "./api-erros";
import dotenv from "dotenv";
dotenv.config();

export type UserPayload = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
};

const SECRET_KEY = process.env.JWT_SECRET!;

export const generateAccessToken = (data: UserPayload) => {
  try {
    return jwt.sign(data, SECRET_KEY, {
      algorithm: "RS256",
      expiresIn: "10m",
    });
  } catch (error) {
    throw ApiError.InternalServerError("Error to creating the tokens");
  }
};

export const generateRefreshToken = (data: UserPayload) => {
  try {
    return jwt.sign(data, SECRET_KEY, {
      algorithm: "RS256",
      expiresIn: "24h",
    });
  } catch (error) {
    throw ApiError.InternalServerError("Error to creating the tokens");
  }
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    throw ApiError.unauthorized("Tokens are expired");
  }
};
