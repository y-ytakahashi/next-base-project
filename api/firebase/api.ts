import type { AxiosRequestConfig } from "axios";
import { apiRequest } from "@/lib/axios";

const baseURL = "http://localhost:3000/api";
// 詳細取得
export const fbCreateAccount = async ({ email, password }: { email: string; password: string }): Promise<any> => {
  const config: AxiosRequestConfig = {
    method: "POST",
    baseURL,
    url: "/auth/signUp",
    data: {
      email,
      password
    }
  };
  return await apiRequest(config);
};

export const fbVerifyToken = async (token: string | undefined): Promise<any> => {
  const apiKey = "AIzaSyA0O40wbBO08WlvdNrZ5KzufeD_Y9EbwfU";
  const config: AxiosRequestConfig = {
    method: "POST",
    baseURL: "https://identitytoolkit.googleapis.com/v1",
    url: `/accounts:lookup?key=${apiKey}`,
    data: {
      idToken: token,
      returnSecureToken: true
    }
  };
  return await apiRequest(config);
};
