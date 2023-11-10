import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

// 管理者権限が必要なパス一覧
const authOnlyPathReg = [new RegExp(`^/example/.*$`)];

export const config = {
  // ログインページ（/login）以外を対象にする ?!で否定
  matcher: ["/((?!auth).*)", "/((?!tether).*)"]
};

export function middleware(req: NextRequest) {}

export default withAuth(
  function middleware(req) {
    console.log("in with auth: ", req.nextauth);
    const { pathname } = req.nextUrl;
    // callbacks.authorizedがtrueの場合のみ進入できる
    if (req.nextauth.token?.userRole !== "admin" && authOnlyPathReg.some((regex) => regex.test(pathname))) {
      return NextResponse.rewrite(new URL("/auth/signIn", req.url));
    }
  },
  {
    callbacks: {
      // 認可に関する処理。ロールが `admin` ならOK
      authorized: ({ token }) => {
        console.log("in authorized: ", token);
        return !!token;
      }
    }
  }
);
