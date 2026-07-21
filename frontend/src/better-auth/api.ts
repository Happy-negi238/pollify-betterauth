import { authClient } from "./auth-client";

export type SignUpType = {
  name: string;
  email: string;
  password: string;
};

export const signUp = async (data: SignUpType) => {
  const response = await authClient.signUp.email({
    name: data.name,
    email: data.email,
    password: data.password,
  });

  console.log(response);
};
