import * as jose from "jose";
import NextAuth from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import type { Account, NextAuthOptions, Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import { fbVerifyToken } from "@/api/firebase/api";

export const Option: NextAuthOptions = {
  debug: true,
  providers: [
    // ユーザー新規作成時に利用
    Credentials({
      name: "Firebase Authenticator",
      credentials: {
        idToken: { label: "ID Token", type: "text" }
      },
      authorize: async (credentials, req) => {
        if (credentials == null) return null;
        const idToken = credentials.idToken;
        const { users } = await fbVerifyToken(idToken);
        console.log("verify user");
        console.log(users);
        return { ...users[0], idToken };
      }
    }),
    GoogleProvider({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET)
    })
  ],
  pages: {
    signIn: "/auth/signIn"
  },
  callbacks: {
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      if (token.idToken != null && token.provider != null) {
        const payload = {
          sub: token.sub,
          provider: String(token.provider),
          idToken: String(token.idToken)
        };
        console.log({ payload });

        const secret = new TextEncoder().encode(String(process.env.APP_ACCESS_TOKEN_SECRET));

        const alg = "HS256";

        // バックエンドと通信するときにappAccessTokenを利用する
        session.appAccessToken = await new jose.SignJWT(payload)
          .setProtectedHeader({ alg })
          .setExpirationTime("30d")
          .setJti(String(token.jti))
          .sign(secret);
      }

      return session;
    },
    jwt: async ({ token, account, user }: { token: JWT; account: Account | null; user: User | AdapterUser }) => {
      // 新規でログインした場合こちらの分岐に入る
      if (account && user) {
        token.uid = user.localId;
        token.provider = account.provider;
        token.idToken = user.idToken;
        token.email = user.email;
        token.emailVerified = user.emailVerified;
      }
      console.log("JWT");
      console.log({ token });
      console.log("Account");
      console.log({ account });
      console.log("User");
      console.log({ user });

      return token;
    }
  }
};

const handler = NextAuth(Option);
export { handler as GET, handler as POST };
