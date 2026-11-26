import { createHmac, timingSafeEqual } from "node:crypto";

export const UNSAID_COOKIE = "unsaid_session";

export function verifyUnsaidSession(token: string | undefined): boolean {
  const password = process.env.UNSAID_PASSWORD;
  const secret = process.env.UNSAID_SESSION_SECRET;

  if (!token || !password || !secret) return false;

  const parts = token.split(":");

  if (parts.length !== 3) return false;

  const [prefix, expiresAtString, signature] = parts;

  if (prefix !== "unsaid" || !/^\d+$/.test(expiresAtString)) {
    return false;
  }

  const expiresAt = Number(expiresAtString);

  if (
    !Number.isSafeInteger(expiresAt) ||
    expiresAt <= Math.floor(Date.now() / 1000)
  ) {
    return false;
  }

  if (!/^[a-f0-9]{64}$/i.test(signature)) return false;

  const payload = `${prefix}:${expiresAtString}`;

  const expectedSignature = createHmac("sha256", secret)
    .update(`${payload}:${password}`)
    .digest("hex");

  const received = Buffer.from(signature, "hex");
  const expected = Buffer.from(expectedSignature, "hex");

  return (
    received.length === expected.length && timingSafeEqual(received, expected)
  );
}

export function getUnsaidSessionId(token: string | undefined): string | null {
  if (!verifyUnsaidSession(token) || !token) return null;

  return createHmac("sha256", process.env.UNSAID_SESSION_SECRET!)
    .update(token)
    .digest("hex");
}
