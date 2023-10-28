import * as jose from "jose";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { DefaultSession, NextAuthOptions, Session, User } from "next-auth";
import type { DefaultJWT, JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    appAccessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    iat: number;
    exp: number;
    jti: string;
  }
}

export const options: NextAuthOptions = {
  debug: true,
  providers: [
    GoogleProvider({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET)
    })
  ],
  callbacks: {
    session: async ({ session, token }: { session: Session; user: User; token: JWT }) => {
      if (token.sub != null && token.provider != null) {
        const payload = {
          sub: token.sub,
          provider: String(token.provider)
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
      }

      return token;
    }
  }
};

const handler = NextAuth(options);
export { handler as GET, handler as POST };
