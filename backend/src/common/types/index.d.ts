
type Question = InferSelectModel<typeof question>;

export type UserPayload = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null | undefined;
};

export declare global {
  namespace Express {
    interface Request {
      user: UserPayload;
      questionData: Question;
    }
  }
}
