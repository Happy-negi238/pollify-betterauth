export type Visibility = "public" | "private";

export type AnswerField = {
  title: string;
  isCorrect: boolean;
};

export type PollFormValues = {
  title: string;
  description: string;
  durationSeconds: number;
  visibility: Visibility;
  question: string;
  answers: AnswerField[];
};
