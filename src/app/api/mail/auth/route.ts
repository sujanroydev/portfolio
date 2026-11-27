import { NextRequest, NextResponse } from "next/server";
import {
  createMailSession,
  getMailDashboardPassword,
  getMailClientIp,
  isMailRateLimited,
  isSameOrigin,
  MAIL_SESSION_COOKIE,
  MAIL_SESSION_DURATION,
  mailPasswordsMatch,
} from "@/lib/mail-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_LOGIN_ATTEMPTS = 5;

function response(message: string, status: number) {
  return NextResponse.json(
    { message },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return response("This request is not allowed.", 403);
  }

  const expectedPassword = getMailDashboardPassword();
  if (!expectedPassword) {
    return response(
      "Set a unique EMAIL_DASHBOARD_PASSWORD with at least 24 characters.",
      503,
    );
  }

  if (
    isMailRateLimited(
      `login:${getMailClientIp(request)}`,
      MAX_LOGIN_ATTEMPTS,
    )
  ) {
    return response("Too many sign-in attempts. Please wait before trying again.", 429);
  }

  let submittedPassword: unknown;
  try {
    const body: unknown = await request.json();
    submittedPassword =
      typeof body === "object" && body !== null && "password" in body
        ? body.password
        : undefined;
  } catch {
    return response("Invalid sign-in request.", 400);
  }

  if (
    typeof submittedPassword !== "string" ||
    !submittedPassword ||
    submittedPassword.length > 512
  ) {
    return response("Enter the dashboard password.", 400);
  }

  if (!mailPasswordsMatch(submittedPassword, expectedPassword)) {
    return response("The password is incorrect.", 401);
  }

  const session = createMailSession(expectedPassword);
  const result = NextResponse.json(
    { success: true },
    { headers: { "Cache-Control": "no-store" } },
  );
  result.cookies.set(MAIL_SESSION_COOKIE, session.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: MAIL_SESSION_DURATION,
    expires: new Date(session.expiresAt * 1000),
  });

  return result;
}

export async function DELETE(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return response("This request is not allowed.", 403);
  }

  const result = NextResponse.json(
    { success: true },
    { headers: { "Cache-Control": "no-store" } },
  );
  result.cookies.set(MAIL_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
  return result;
}
