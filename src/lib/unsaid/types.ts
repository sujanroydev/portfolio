export type UnsaidEventType =
  | "page_view"
  | "response_submitted"
  | "option_selected"
  | "photo_opened"
  | "slideshow_started"
  | "slideshow_paused"
  | "activity_started"
  | "activity_completed"
  | "item_revealed"
  | "button_clicked"
  | "custom";

export type UnsaidEventData = Record<string, unknown>;

export interface UnsaidActivity {
  id: string;
  session_id: string | null;
  page_slug: string;
  event_type: UnsaidEventType;
  event_name: string;
  event_data: UnsaidEventData;
  created_at: string;
}

export interface UnsaidResponse {
  id: string;
  activity_id: string | null;
  page_slug: string;
  question_id: string;
  question_text: string;
  response: unknown;
  created_at: string;
  updated_at: string;
}
