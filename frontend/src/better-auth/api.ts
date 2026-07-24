import { authClient } from "./auth-client";
import { api } from "./axios";

import type { PollFormValues } from "@/pages/polls/types";
import type { LoginInType, SignUpType } from "./types";


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

  console.log(response);
}
