import { NextRequest, NextResponse } from "next/server";
import {
  cleanText,
  createUnsaidAdminClient,
  requireUnsaidSession,
  unauthorized,
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
    const questionId = cleanText(body?.question_id, 120);
    const questionText = cleanText(body?.question_text, 1000);

    if (!pageSlug || !UNSAID_PAGE_SLUGS.has(pageSlug)) {
      return NextResponse.json({ message: "Invalid page slug." }, { status: 400 });
    }
    if (!questionId || !questionText) {
      return NextResponse.json({ message: "question_id and question_text are required." }, { status: 400 });
    }
    if (!Object.prototype.hasOwnProperty.call(body, "response")) {
      return NextResponse.json({ message: "response is required." }, { status: 400 });
    }

    const serialized = JSON.stringify(body.response);
    if (serialized.length > 50000) {
      return NextResponse.json({ message: "Response is too large." }, { status: 413 });
    }

    const supabase = createUnsaidAdminClient();
    const { data, error } = await supabase
      .from("unsaid_responses")
      .insert({
        activity_id: typeof body.activity_id === "string" ? body.activity_id : null,
        page_slug: pageSlug,
        question_id: questionId,
        question_text: questionText,
        response: body.response,
      })
      .select("id")
      .single();

    if (error) throw error;
    return NextResponse.json({ response: data }, { status: 201 });
  } catch (error) {
    console.error("Unsaid response insert failed:", error);
    return NextResponse.json({ message: "Unable to save response." }, { status: 500 });
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
    const search = cleanText(url.searchParams.get("search"), 100);
    const from = url.searchParams.get("from");
    const to = url.searchParams.get("to");
    const sort = url.searchParams.get("sort") === "asc" ? "asc" : "desc";

    const supabase = createUnsaidAdminClient();
    let query = supabase
      .from("unsaid_responses")
      .select("id,activity_id,page_slug,question_id,question_text,response,created_at,updated_at", { count: "exact" })
      .order("created_at", { ascending: sort === "asc" })
      .order("id", { ascending: sort === "asc" })
      .range(offset, offset + limit - 1);

    if (pageSlug && UNSAID_PAGE_SLUGS.has(pageSlug)) query = query.eq("page_slug", pageSlug);
    if (search) query = query.ilike("search_text", `%${search}%`);
    if (from && /^\d{4}-\d{2}-\d{2}/.test(from)) query = query.gte("created_at", new Date(`${from}T00:00:00.000Z`).toISOString());
    if (to && /^\d{4}-\d{2}-\d{2}/.test(to)) query = query.lte("created_at", new Date(`${to}T23:59:59.999Z`).toISOString());

    const { data, count, error } = await query;
    if (error) throw error;

    return NextResponse.json({
      responses: data ?? [],
      pagination: { page: Math.max(1, page), limit, total: count ?? 0 },
    });
  } catch (error) {
    console.error("Unsaid response query failed:", error);
    return NextResponse.json({ message: "Unable to load responses." }, { status: 500 });
  }
}
