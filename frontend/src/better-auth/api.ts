import { authClient } from "./auth-client";

export type SignUpType = {
  name: string;
  email: string;
  password: string;
};

export type LoginInType = {
  email: string;
  password: string;
};

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
