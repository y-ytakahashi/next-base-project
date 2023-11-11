import * as jose from "jose";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions, Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import { fbVerifyToken } from "@/api/firebase/api";
import { fbAdminAuth } from "@/lib/firebase/admin";

export const Option: NextAuthOptions = {
  debug: true,
  providers: [
    Credentials({
      name: "Firebase",
      credentials: {},
      authorize: async (credentials, req) => {
        console.log("next-auth 連携！");
        console.log({ credentials });
        const result = await fbVerifyToken(credentials?.idToken);
        console.table(result);
        // return null;
        // try {
        //   // Firebase Admin SDKを使ってidTokenを検証
        //   const decodedToken = await fbAdminAuth.verifyIdToken(credentials?.idToken);
        //   const user = { id: decodedToken.uid, email: decodedToken.email };
        //   return user;
        // } catch (error) {
        //   throw new Error("認証に失敗しました。");
        // }
        return null;
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
    session: async ({ session, user, token }: { session: Session; user: User; token: JWT }) => {
      if (token.sub != null && token.provider != null) {
        const payload = {
          sub: token.sub,
          provider: String(token.provider),
          userRole: "admin1",
          idToken: String(token.idToken)
        };

        const secret = new TextEncoder().encode(String(process.env.APP_ACCESS_TOKEN_SECRET));

        const alg = "HS256";

        session.appAccessToken = await new jose.SignJWT(payload)
          .setProtectedHeader({ alg })
          .setExpirationTime("30d")
          .setJti(String(token.jti))
          .sign(secret);
      }

      return session;
    },
    jwt: async ({ token, account }) => {
      if (account) {
        token.provider = account.provider;
        token.idToken = account.id_token;
        // id_tokenをどうにかする場所
        console.log({ account });
      }

      return token;
    }
  }
};

const handler = NextAuth(Option);
export { handler as GET, handler as POST };
