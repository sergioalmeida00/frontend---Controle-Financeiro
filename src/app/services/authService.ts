import { sleep } from "../utils/sleep";
import { httpClient } from "./httpClient";

export interface SigninParams {
  email: string;
  password: string;
}

export interface SignupParams {
  name: string;
  email: string;
  password: string;
}

async function signin(params: SigninParams) {
  await sleep()
  const { data } = await httpClient.post<{ access_token: string }>(
    "/auth/login",
    params
  );

  return data;
}

async function signup(params: SignupParams) {
  await sleep()
  const { data } = await httpClient.post<{ access_token: string }>(
    "/auth/create",
    params
  );
  return data;
}

export const AuthService = {
  signin,
  signup,
};
