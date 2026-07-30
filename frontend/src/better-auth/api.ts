import { authClient } from "./auth-client";
import { api } from "./axios";

import type { PollFormValues } from "@/pages/polls/types";
import type {
  DashboardResponseType,
  LoginInType,
  PollDetailResponseType,
  PollVoteResponseType,
  QuestionAnswerResponseType,
  SignUpType,
} from "./types";

export const signUp = async (data: SignUpType) => {
  const response = await authClient.signUp.email({
    name: data.name,
    email: data.email,
    password: data.password,
  });

  return { data: response };
};

export const signIn = async (data: LoginInType) => {
  const response = await authClient.signIn.email({
    email: data.email,
    password: data.password,
  });

  return { data: response };
};

export const signOut = async () => {
  const response = await authClient.signOut();

  return { data: response };
};

export const authentication = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/get-session`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    return null;
  }
};

export const createPoll = async (payload: PollFormValues) => {
  const response = await api.post("/poll/poll-create", payload);

  const { data } = response;
  return { data };
};

export const getPollDetail = async (
  dashboardCode: string,
): Promise<PollDetailResponseType> => {
  const response = await api.get<PollDetailResponseType>(
    `/poll/poll-detail/${dashboardCode}`,
  );

  const { data, message } = response.data;
  return { data, message };
};

export const dashboard = async (): Promise<DashboardResponseType> => {
  const response = await api.get("/poll/dashboard");

  const { data, message } = response.data;
  return { data, message };
};

export const pollVoteGet = async (
  pollCode: string,
  fingerPrintId: string,
): Promise<QuestionAnswerResponseType> => {
  console.log("finger print id frontend: ", fingerPrintId);
  const response = await api.get<QuestionAnswerResponseType>(
    `/poll/poll-vote/${pollCode}`,
    {
      params: { fingerPrintId },
    },
  );

  const { message, data } = response.data;
  return { data, message };
};

export const pollVotePost = async (
  pollCode: string,
  answerId: string,
  fingerPrintId: string,
): Promise<PollVoteResponseType> => {
  const response = await api.post<PollVoteResponseType>(
    `/poll/poll-vote/${pollCode}`,
    {
      answerId,
      fingerPrintId,
    },
  );
  const { data, message } = response.data;
  return { data, message };
};

export const deleteQuestion = async (id: string) => {
  const response = await api.delete("poll/delete", { data: { id } });
  const { data, message } = response.data;
  return { data, message };
};
