import { FirebaseError } from "@firebase/app";
import { sendEmailVerification } from "@firebase/auth";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import * as jose from "jose";
import { NextResponse } from "next/server";
import { auth } from "@/lib/firebase/client";

type ReqBody = {
  email: string;
  password: string;
};
export async function POST(req: Request) {
  // console.log(await req.json());
  const { email, password } = (await req.json()) as ReqBody;
  try {
    // ユーザーを作成
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    // 認証メールを送信
    await sendEmailVerification(credential.user);
    // ユーザートークンを返却
    const idToken = await credential.user.getIdToken();
    // 念の為cookieを暗号化する
    // const secret = new TextEncoder().encode(String(process.env.APP_ACCESS_TOKEN_SECRET));
    // const alg = "HS256";
    //
    // const payload = {
    //   idToken
    // };
    //
    // // 暗号化
    // const encryptedIdToken = await new jose.SignJWT(payload)
    //   .setProtectedHeader({ alg })
    //   .setExpirationTime("1d")
    //   .setJti(String(credential.user.uid))
    //   .sign(secret);
    //
    // console.log({ idToken });
    // console.log({ encryptedIdToken });
    //
    // return new NextResponse(JSON.stringify({ idToken: encryptedIdToken }));
    return new NextResponse(JSON.stringify({ idToken }));
  } catch (e) {
    if (e instanceof FirebaseError) {
      console.log(e);
      return new NextResponse(JSON.stringify({ message: e.message }));
    }
  }
}
