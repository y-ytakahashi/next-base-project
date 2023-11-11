import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import { setupInterceptorsTo } from "@/lib/axiosIntercepter";

// axios instanceを作成
const axiosInstance = setupInterceptorsTo(
  axios.create({
    // TODO サンプルコードなのでポケモンAPIを利用しているので、本番は変更する
    // TODO 環境により取得するURLを変更できるようにする
    baseURL: "https://pokeapi.co/api/v2/",
    headers: {
      "Content-Type": "application/json"
    }
  })
);

// TODO interceptorsToでハンドリングするかこっちでハンドリングするか検討
// TODO エラーが発生した場合、トースト出したい気もするからステート管理の都合で調整
export const apiRequest = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await axiosInstance(config);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
