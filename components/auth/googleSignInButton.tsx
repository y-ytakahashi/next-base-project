"use client";

import { signInWithEmailAndPassword } from "@firebase/auth";
import { Box, Button } from "@mui/material";
import { bgcolor } from "@mui/system";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import type { MouseEvent } from "react";
import { auth } from "@/lib/firebase/client";

type SignInForm = {
  email: string;
  password: string;
};
const handleLogin = async (event: MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();

  await signIn("google", { callbackUrl: "/example" });
};

export const GoogleSignInButton = () => {
  const signInHandler = async (data: SignInForm) => {
    const { email, password } = data;
    const res = await signInWithEmailAndPassword(auth, email, password);
    // TODO 暫定で認証情報を固定している
    const signInres = await signIn("credentials", { idToken: res._tokenResponse.idToken });
    console.log(res);

    console.log(signInres);
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInForm>();

  return (
    <Box className={"flex flex-col justify-center items-center"}>
      <Box className={"mx-auto flex w-full justify-center flex-col items-center"}>
        <form className={"flex justify-center items-center flex-col"}>
          <Box className={"mb-4"}>
            <label className={"mb-1 block"}>email</label>
            <input
              className={"block w-full border-gray-700 border"}
              {...register("email", { required: "emailを入力してください" })}
              value={"ytakahashi@y-y.dev"}
            />
          </Box>
          <Box className={"mb-4"}>
            <label>password</label>
            <input
              className={"block w-full border-gray-700 border"}
              {...register("password", { required: "passwordを入力してください" })}
              value={"A123ZZZk123e"}
            />
          </Box>
          <Button className={"bg-blue-400 hover:bg-blue-950"} onClick={handleSubmit(signInHandler)}>
            ログイン
          </Button>
        </form>
      </Box>
      <Button
        type="button"
        className="dark:focus:ring-[#4285F4]/55 mb-2 mr-2 inline-flex items-center rounded-lg bg-[#4285F4] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#4285F4]/90 focus:ring-4 focus:ring-[#4285F4]/50"
        onClick={handleLogin}
      >
        <svg
          className="-ml-1 mr-2 h-4 w-4"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="google"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 488 512"
        >
          <path
            fill="currentColor"
            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
          ></path>
        </svg>
        sign in with Google
      </Button>
    </Box>
  );
};
