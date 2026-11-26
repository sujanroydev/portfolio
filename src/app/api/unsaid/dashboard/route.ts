import { NextRequest, NextResponse } from "next/server";
import { createUnsaidAdminClient, requireUnsaidSession, unauthorized } from "@/lib/unsaid/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!requireUnsaidSession(request)) return unauthorized();

  try {
    const supabase = createUnsaidAdminClient();
    const [overviewResult, pageResult] = await Promise.all([
      supabase.rpc("unsaid_dashboard_overview"),
      supabase.rpc("unsaid_page_analytics"),
    ]);

    if (overviewResult.error) throw overviewResult.error;
    if (pageResult.error) throw pageResult.error;

    return NextResponse.json({
      overview: overviewResult.data,
      pages: pageResult.data ?? [],
    });
  } catch (error) {
    console.error("Unsaid dashboard aggregate failed:", error);
    return NextResponse.json({ message: "Unable to load dashboard summary." }, { status: 500 });
  }
}
