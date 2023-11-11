"use client";
import { Button } from "@mui/material";
import { signIn } from "next-auth/react";
import React from "react";
import { fbCreateAccount } from "@/api/firebase/api";
import GoogleSignUp from "@/components/auth/GoogleSignUp";

const exampleAppRouteRequest = async () => {
  const res = await fbCreateAccount({ email: "ytakahashi@y-y.dev", password: "A123ZZZk123e" });
  console.log(res);
  const auth = await signIn("credentials", { idToken: res.idToken });
  console.log({ auth });
};
const SignUp = () => {
  return (
    <div>
      <GoogleSignUp />
      <Button onClick={exampleAppRouteRequest}>Sign Up</Button>
    </div>
  );
};
export default SignUp;
