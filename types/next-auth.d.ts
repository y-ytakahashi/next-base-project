import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    localId: string;
    emailVerified?: boolean;
    idToken?: string;
  }
}

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
    emailVerified?: boolean | Date | null | undefined;
    iat: number;
    exp: number;
    jti: string;
    idToken?: string;
    userRole?: string;
  }
}
