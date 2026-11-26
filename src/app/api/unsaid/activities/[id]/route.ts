import { NextRequest, NextResponse } from "next/server";
import { createUnsaidAdminClient, requireUnsaidSession, unauthorized } from "@/lib/unsaid/server";

export const runtime = "nodejs";

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  if (!requireUnsaidSession(request)) return unauthorized();

  const { id } = await context.params;
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
    return NextResponse.json({ message: "Invalid activity identifier." }, { status: 400 });
  }

  try {
    const supabase = createUnsaidAdminClient();
    const { error } = await supabase.from("unsaid_activities").delete().eq("id", id);
    if (error) throw error;
    return NextResponse.json({ deleted: true });
  } catch (error) {
    console.error("Unsaid activity delete failed:", error);
    return NextResponse.json({ message: "Unable to delete activity." }, { status: 500 });
  }
}
