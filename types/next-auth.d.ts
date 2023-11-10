import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    appAccessToken: string;
    idToken: string;
    provider: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    iat: number;
    exp: number;
    jti: string;
    userRole?: string;
  }
}
