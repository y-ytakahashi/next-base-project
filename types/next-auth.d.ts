import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    appAccessToken: string;
    idToken: string;
    provider: string;
    user: {
      uuid: string;
      emailVerified?: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    uid: string;
    emailVerified?: boolean;
    iat: number;
    exp: number;
    jti: string;
    userRole?: string;
  }
}
