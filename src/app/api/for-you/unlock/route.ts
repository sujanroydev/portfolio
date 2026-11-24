import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";

export const runtime = "nodejs";

const COOKIE_NAME = "for_you_session";
const SESSION_DURATION = 60 * 60 * 24 * 7; // 7 days

function createSessionToken(password: string, secret: string) {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_DURATION;

  const payload = `for-you:${expiresAt}`;
  const signature = createHmac("sha256", secret)
    .update(`${payload}:${password}`)
    .digest("hex");

  return {
    token: `${payload}:${signature}`,
    expiresAt,
  };
}

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (typeof password !== "string" || !password.trim()) {
      return NextResponse.json(
        { message: "Please enter the password." },
        { status: 400 },
      );
    }

    const expectedPassword = process.env.FOR_YOU_PASSWORD;
    const sessionSecret = process.env.FOR_YOU_SESSION_SECRET;

    if (!expectedPassword || !sessionSecret) {
      console.error("Missing FOR_YOU_PASSWORD or FOR_YOU_SESSION_SECRET.");
      return NextResponse.json(
        { message: "Authentication is not configured." },
        { status: 500 },
      );
    }

    const submitted = Buffer.from(password);
    const expected = Buffer.from(expectedPassword);

    const passwordMatches =
      submitted.length === expected.length &&
      timingSafeEqual(submitted, expected);

    if (!passwordMatches) {
      return NextResponse.json(
        { message: "Not quite right. Try again. 💗" },
        { status: 401 },
      );
    }

    const { token, expiresAt } = createSessionToken(
      expectedPassword,
      sessionSecret,
    );

    const response = NextResponse.json({ success: true });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(expiresAt * 1000),
    });

    return response;
  } catch {
    return NextResponse.json(
      { message: "Invalid request. Please try again." },
      { status: 400 },
    );
  }
}
