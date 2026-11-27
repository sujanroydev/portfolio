import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";

export const MAIL_SESSION_COOKIE = "email_dashboard_session";
export const MAIL_SESSION_DURATION = 60 * 60 * 8;

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

export function getMailDashboardPassword() {
  const password = process.env.EMAIL_DASHBOARD_PASSWORD;
  return password && password.length >= 24 ? password : undefined;
}

export function createMailSession(password: string) {
  const expiresAt = Math.floor(Date.now() / 1000) + MAIL_SESSION_DURATION;
  const payload = `mail:${expiresAt}`;
  const signature = createHmac("sha256", password)
    .update(payload)
    .digest("hex");

  return { token: `${payload}:${signature}`, expiresAt };
}

export function verifyMailSession(
  token: string | undefined,
  password: string | undefined,
) {
  if (!token || !password) return false;

  const parts = token.split(":");
  if (parts.length !== 3) return false;

  const [prefix, expiresAtString, signature] = parts;
  if (
    prefix !== "mail" ||
    !/^\d+$/.test(expiresAtString) ||
    !/^[a-f0-9]{64}$/i.test(signature)
  ) {
    return false;
  }

  const expiresAt = Number(expiresAtString);
  if (
    !Number.isSafeInteger(expiresAt) ||
    expiresAt <= Math.floor(Date.now() / 1000)
  ) {
    return false;
  }

  const expected = createHmac("sha256", password)
    .update(`${prefix}:${expiresAtString}`)
    .digest();
  const received = Buffer.from(signature, "hex");
  return received.length === expected.length && timingSafeEqual(received, expected);
}

export function mailPasswordsMatch(submitted: string, expected: string) {
  const submittedHash = createHash("sha256").update(submitted).digest();
  const expectedHash = createHash("sha256").update(expected).digest();
  return timingSafeEqual(submittedHash, expectedHash);
}

export function isMailRateLimited(
  key: string,
  maximum: number,
  windowMs = RATE_LIMIT_WINDOW_MS,
) {
  const now = Date.now();
  const bucket = rateLimitBuckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    rateLimitBuckets.set(key, { count: 1, resetAt: now + windowMs });
  } else if (bucket.count >= maximum) {
    return true;
  } else {
    bucket.count += 1;
  }

  if (rateLimitBuckets.size > 1000) {
    for (const [bucketKey, entry] of rateLimitBuckets) {
      if (entry.resetAt <= now) rateLimitBuckets.delete(bucketKey);
    }
  }

  return false;
}

export function getMailClientIp(request: NextRequest) {
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp.slice(0, 64);

  const forwardedIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwardedIp ? forwardedIp.slice(0, 64) : "unknown";
}

export function isSameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  try {
    const originUrl = new URL(origin);
    if (originUrl.username || originUrl.password) return false;

    const forwardedProtocol = request.headers
      .get("x-forwarded-proto")
      ?.split(",")[0]
      ?.trim()
      .replace(/:$/, "");
    const protocol = forwardedProtocol
      ? `${forwardedProtocol}:`
      : request.nextUrl.protocol;
    if (protocol !== "http:" && protocol !== "https:") return false;

    const requestHosts = [
      request.headers.get("x-forwarded-host"),
      request.headers.get("host"),
    ]
      .flatMap((value) => value?.split(",") ?? [])
      .map((host) => host.trim())
      .filter(Boolean);

    if (requestHosts.length === 0) {
      return originUrl.origin === request.nextUrl.origin;
    }

    return requestHosts.some(
      (host) => new URL(`${protocol}//${host}`).origin === originUrl.origin,
    );
  } catch {
    return false;
  }
}
