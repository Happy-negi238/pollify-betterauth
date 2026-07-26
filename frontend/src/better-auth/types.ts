export type SignUpType = {
  name: string;
  email: string;
  password: string;
};

export type LoginInType = {
  email: string;
  password: string;
};

export type PollVisibility = "public" | "private";

export type PollDetailType = {
  id: string;
  pollCode: string;
  duration: Date;
  title: string;
  description: string;
  visibility: PollVisibility;
};

export type PollDetailResponseType = {
  message: string;
  data: PollDetailType;
};

export type DashboardType =
  | {
      id: string;
      userId: string;
      title: string;
      description: string | null;
      visibility: "public" | "private";
      expireAt: Date;
      status: "live" | "ended";
      question: string;
      dashboardCode: string;
      pollCode: string;
      createdAt: Date;
      updatedAt: Date;
    }[]
  | null;

export type DashboardResponseType = {
  data: {
    result: DashboardType;
  };
  message: string;
};

export type QuestionType = {
  title: string;
  description: string | null;
  visibility: string;
  status: "live" | "ended";
  question: string;
};

export type AnswersType = {
  id: string;
  questionId: string;
  title: string;
  isCorrect: boolean | null;
}[];

export type QuestionAnswerResponseType = {
  data: {
    question: QuestionType;
    answers: AnswersType;
  };
  message: string;
};

export type PollVoteType = {
  id: string;
  votes: number | null;
};

export type PollVoteResponseType = {
  data: {
    data: PollVoteType;
  };
  message: string;
};
