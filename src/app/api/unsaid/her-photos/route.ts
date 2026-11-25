import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { UNSAID_COOKIE, verifyUnsaidSession } from "@/lib/unsaid-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BUCKET = "her-photos";
const URL_DURATION = 10 * 60;

export async function GET(request: NextRequest) {
  const token = request.cookies.get(UNSAID_COOKIE)?.value;

  if (!verifyUnsaidSession(token)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json(
      { message: "Storage is not configured." },
      { status: 500 },
    );
  }

  try {
    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const { data: files, error: listError } = await supabase.storage
      .from(BUCKET)
      .list("gallery", {
        limit: 1000,
        sortBy: { column: "name", order: "asc" },
      });

    if (listError) throw listError;

    const paths = (files ?? [])
      .filter((file) => /\.(jpg|jpeg|png|webp|avif)$/i.test(file.name))
      .map((file) => `gallery/${file.name}`);

    if (paths.length === 0) {
      return NextResponse.json(
        { photos: [] },
        { headers: { "Cache-Control": "private, no-store" } },
      );
    }

    const { data: signedFiles, error: signedError } = await supabase.storage
      .from(BUCKET)
      .createSignedUrls(paths, URL_DURATION);

    if (signedError) throw signedError;

    const photos = (signedFiles ?? []).flatMap((file) =>
      file.signedUrl && file.path
        ? [{ path: file.path, url: file.signedUrl }]
        : [],
    );

    return NextResponse.json(
      { photos },
      { headers: { "Cache-Control": "private, no-store" } },
    );
  } catch (error) {
    console.error("Private gallery error:", error);

    return NextResponse.json(
      { message: "Unable to load photos." },
      { status: 500 },
    );
  }
}
