import axios from "axios";
import type { AxiosResponse } from "axios";

// TODO 認証はauthが用意しているgetServerSessionを使った方が楽かも
const LocalFetcher = <T>(path: string): Promise<T> =>
  axios.get(process.env.NEXTAUTH_URL + path).then((res: AxiosResponse<T>) => res.data);

export { LocalFetcher };
