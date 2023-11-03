import { getServerSession } from "next-auth";
import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { Option } from "@/app/api/auth/[...nextauth]/route";
import { useSessionStore } from "@/store/sessionStore";

// SSR・CSRで Authorization header に token を設定する
// TODO バックエンドを作ったら動くか動作確認
const onRequest = async (config: InternalAxiosRequestConfig) => {
  // TODO config.headersがundefinedの場合はどのような挙動になるか確認する
  // if (config.headers !== undefined) {
  //   config.headers.Authorization = `Bearer ${session?.appAccessToken}`;
  // }

  if (typeof window === "undefined") {
    console.log("Server-side request");
    // The code is running on the server-side (SSR)
    const ssrSession = await getServerSession(Option);
    // TODO バックエンドを作成しheaderのauthorizationにtokenが設定されているか確認する
    if (ssrSession && ssrSession?.appAccessToken) {
      config.headers.Authorization = `Bearer ${ssrSession?.appAccessToken}`;

      // TODO 動作確認用なのであとで削除する
      console.log("axios get ssr session");
      console.log(ssrSession?.appAccessToken);
    }
  } else {
    // The code is running on the client-side (CSR)
    console.log("Client-side request");
    const token = useSessionStore.getState().token;
    // TODO CSRの場合 local storageにtokenを保存しこれを操作する必要あり？
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  //TODO 付与されているヘッダーの確認用 確認後に消す
  console.log("Starting Request", JSON.stringify(config, null, 2));

  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

// リクエストでエラーが発生したときの処理
const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  if (error.response) {
    // Access Token was expired
    if (error.response.status === 401) {
      // const storedToken = JSON.parse(localStorage.getItem("token") ?? "{}");

      // try {
      //   const rs = await axios.post(`${API_URL}/auth/refresh`, {
      //     refresh_token: storedToken.refresh_token
      //   });
      //
      //   const { token, user } = rs.data;
      //
      //   localStorage.setItem("token", JSON.stringify(token));
      //   localStorage.setItem("user", JSON.stringify(user));
      //
      //   return;
      // } catch (_error) {
      //   return Promise.reject(_error);
      // }
      console.log("un authorized token");
    }
  }
  return Promise.reject(error);
};

export const setupInterceptorsTo = (axiosInstance: AxiosInstance): AxiosInstance => {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
};
