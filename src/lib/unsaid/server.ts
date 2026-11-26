import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { UNSAID_COOKIE, verifyUnsaidSession, getUnsaidSessionId } from "@/lib/unsaid-auth";

export const UNSAID_PAGE_SLUGS = new Set([
  "index", "questions", "love", "constellation", "feelings", "letter",
  "memories", "reasons", "surprise", "if", "roulette", "open-when",
  "diary", "jar", "scrapbook", "secret", "gallery", "songs",
  "this-or-that", "time", "universe", "wish",
]);

export const UNSAID_EVENT_TYPES = new Set([
  "page_view", "response_submitted", "option_selected", "photo_opened",
  "slideshow_started", "slideshow_paused", "activity_started",
  "activity_completed", "item_revealed", "button_clicked", "custom",
]);

export function requireUnsaidSession(request: NextRequest) {
  const token = request.cookies.get(UNSAID_COOKIE)?.value;
  if (!verifyUnsaidSession(token)) return null;
  return { token: token!, sessionId: getUnsaidSessionId(token)! };
}

export function unauthorized() {
  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}

export function createUnsaidAdminClient(): SupabaseClient {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase is not configured.");

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function cleanText(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return null;
  const cleaned = value.trim().replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "");
  if (!cleaned || cleaned.length > maxLength) return null;
  return cleaned.slice(0, maxLength);
}
