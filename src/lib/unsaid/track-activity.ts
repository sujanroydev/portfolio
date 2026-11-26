"use client";

import type { UnsaidEventData, UnsaidEventType } from "./types";

export async function trackActivity(
  pageSlug: string,
  eventName: string,
  eventData: UnsaidEventData = {},
  eventType: UnsaidEventType = "custom",
) {
  try {
    const response = await fetch("/api/unsaid/activities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page_slug: pageSlug, event_name: eventName, event_type: eventType, event_data: eventData }),
      cache: "no-store",
      keepalive: true,
    });

    if (!response.ok) return null;
    return (await response.json()) as { activity: { id: string } };
  } catch {
    return null;
  }
}

export async function trackResponse(
  pageSlug: string,
  questionId: string,
  questionText: string,
  response: unknown,
  activityId?: string,
) {
  try {
    const result = await fetch("/api/unsaid/responses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page_slug: pageSlug,
        question_id: questionId,
        question_text: questionText,
        response,
        activity_id: activityId,
      }),
      cache: "no-store",
      keepalive: true,
    });

    if (!result.ok) return null;
    return (await result.json()) as { response: { id: string } };
  } catch {
    return null;
  }
}
