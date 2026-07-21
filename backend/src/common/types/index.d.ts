import type { UserPayload } from "../utils/jwt-token";

type Question = InferSelectModel<typeof question>;
export type UserPayload = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
};

export declare global {
  namespace Express {
    interface Request {
      user: UserPayload;
      questionData: Question
    }
  }
}
