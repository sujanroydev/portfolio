import { NextRequest, NextResponse } from "next/server";
import { UNSAID_COOKIE, verifyUnsaidSession } from "@/lib/unsaid-auth";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === "/unsaid/enter" || pathname === "/unsaid/enter/") {
    return NextResponse.next();
  }

  const token = request.cookies.get(UNSAID_COOKIE)?.value;

  if (verifyUnsaidSession(token)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/unsaid/enter", request.url));
}

export const config = {
  matcher: ["/unsaid/:path*"],
};
