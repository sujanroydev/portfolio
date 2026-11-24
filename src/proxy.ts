import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "for_you_session";

function isValidSession(token: string | undefined): boolean {
  const password = process.env.FOR_YOU_PASSWORD;
  const secret = process.env.FOR_YOU_SESSION_SECRET;

  if (!token || !password || !secret) {
    return false;
  }

  const parts = token.split(":");

  if (parts.length !== 3) {
    return false;
  }

  const [prefix, expiresAtString, receivedSignature] = parts;

  if (prefix !== "for-you" || !/^\d+$/.test(expiresAtString)) {
    return false;
  }

  const expiresAt = Number(expiresAtString);

  if (
    !Number.isSafeInteger(expiresAt) ||
    expiresAt <= Math.floor(Date.now() / 1000)
  ) {
    return false;
  }

  if (!/^[a-f0-9]{64}$/i.test(receivedSignature)) {
    return false;
  }

  const payload = `${prefix}:${expiresAtString}`;

  const expectedSignature = createHmac("sha256", secret)
    .update(`${payload}:${password}`)
    .digest("hex");

  const received = Buffer.from(receivedSignature, "hex");
  const expected = Buffer.from(expectedSignature, "hex");

  return (
    received.length === expected.length && timingSafeEqual(received, expected)
  );
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Always allow the password-entry page.
  if (pathname === "/unsaid/enter" || pathname === "/unsaid/enter/") {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (isValidSession(token)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/unsaid/enter", request.url));
}

export const config = {
  matcher: ["/unsaid/:path*"],
};
