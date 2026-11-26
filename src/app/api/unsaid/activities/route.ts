import { NextRequest, NextResponse } from "next/server";
import {
  cleanText,
  createUnsaidAdminClient,
  requireUnsaidSession,
  unauthorized,
  UNSAID_EVENT_TYPES,
  UNSAID_PAGE_SLUGS,
} from "@/lib/unsaid/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const session = requireUnsaidSession(request);
  if (!session) return unauthorized();

  try {
    const body = await request.json();
    const pageSlug = cleanText(body?.page_slug, 40);
    const eventName = cleanText(body?.event_name, 120);
    const eventType = cleanText(body?.event_type, 40);

    if (!pageSlug || !UNSAID_PAGE_SLUGS.has(pageSlug)) {
      return NextResponse.json({ message: "Invalid page slug." }, { status: 400 });
    }
    if (!eventName) return NextResponse.json({ message: "Invalid event name." }, { status: 400 });
    if (!eventType || !UNSAID_EVENT_TYPES.has(eventType)) {
      return NextResponse.json({ message: "Invalid event type." }, { status: 400 });
    }
    if (body.event_data !== undefined && (typeof body.event_data !== "object" || body.event_data === null || Array.isArray(body.event_data))) {
      return NextResponse.json({ message: "event_data must be a JSON object." }, { status: 400 });
    }

    const serialized = JSON.stringify(body.event_data ?? {});
    if (serialized.length > 10000) {
      return NextResponse.json({ message: "Event data is too large." }, { status: 413 });
    }

    const supabase = createUnsaidAdminClient();
    const { data, error } = await supabase
      .from("unsaid_activities")
      .insert({
        session_id: session.sessionId,
        page_slug: pageSlug,
        event_name: eventName,
        event_type: eventType,
        event_data: body.event_data ?? {},
      })
      .select("id")
      .single();

    if (error) throw error;
    return NextResponse.json({ activity: data }, { status: 201 });
  } catch (error) {
    console.error("Unsaid activity insert failed:", error);
    return NextResponse.json({ message: "Unable to record activity." }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  if (!requireUnsaidSession(request)) return unauthorized();

  try {
    const url = request.nextUrl;
    const page = Number(url.searchParams.get("page") ?? "1");
    const limit = Math.min(100, Math.max(1, Number(url.searchParams.get("limit") ?? "20")));
    const offset = (Math.max(1, page) - 1) * limit;
    const pageSlug = url.searchParams.get("page_slug");
    const eventType = url.searchParams.get("event_type");
    const search = cleanText(url.searchParams.get("search"), 100);
    const from = url.searchParams.get("from");
    const to = url.searchParams.get("to");
    const sort = url.searchParams.get("sort") === "asc" ? "asc" : "desc";

    const supabase = createUnsaidAdminClient();
    let query = supabase
      .from("unsaid_activities")
      .select("id,session_id,page_slug,event_type,event_name,event_data,created_at", { count: "exact" })
      .order("created_at", { ascending: sort === "asc" })
      .order("id", { ascending: sort === "asc" })
      .range(offset, offset + limit - 1);

    if (pageSlug && UNSAID_PAGE_SLUGS.has(pageSlug)) query = query.eq("page_slug", pageSlug);
    if (eventType && UNSAID_EVENT_TYPES.has(eventType)) query = query.eq("event_type", eventType);
    if (search) query = query.ilike("search_text", `%${search}%`);
    if (from && /^\d{4}-\d{2}-\d{2}/.test(from)) query = query.gte("created_at", new Date(`${from}T00:00:00.000Z`).toISOString());
    if (to && /^\d{4}-\d{2}-\d{2}/.test(to)) query = query.lte("created_at", new Date(`${to}T23:59:59.999Z`).toISOString());

    const { data, count, error } = await query;
    if (error) throw error;

    return NextResponse.json({
      activities: data ?? [],
      pagination: { page: Math.max(1, page), limit, total: count ?? 0 },
    });
  } catch (error) {
    console.error("Unsaid activity query failed:", error);
    return NextResponse.json({ message: "Unable to load activities." }, { status: 500 });
  }
}
