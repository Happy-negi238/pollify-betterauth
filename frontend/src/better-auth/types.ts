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

export type PollAnswer = {
  id: string;
  title: string;
  votes: number;
};

export type PollDetailType = {
  id: string;
  pollCode: string;
  duration: Date;
  title: string;
  description: string;
  visibility: PollVisibility;
  answers: PollAnswer[];
};

export type PollChartProps = {
  answer: PollAnswer[];
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
  expire: Date;
};

export type AnswersType = {
  id: string;
  questionId: string;
  title: string;
  isCorrect: boolean | null;
  votes: number;
}[];

export type QuestionAnswerResponseType = {
  data: {
    alreadyVote: boolean;
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
  data: PollVoteType;
  message: string;
};
