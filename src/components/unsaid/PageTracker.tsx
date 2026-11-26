"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { trackActivity } from "@/lib/unsaid/track-activity";

export default function PageTracker() {
  const pathname = usePathname();
  const lastTracked = useRef("");

  useEffect(() => {
    if (!pathname?.startsWith("/unsaid")) return;
    if (pathname === "/unsaid/enter" || pathname === "/unsaid/deshboard") return;
    if (lastTracked.current === pathname) return;
    lastTracked.current = pathname;

    const slug = pathname.split("/").filter(Boolean)[1] || "index";
    const revisitKey = `unsaid-visited:${slug}`;
    const hasVisited = sessionStorage.getItem(revisitKey) === "1";
    sessionStorage.setItem(revisitKey, "1");

    void trackActivity(
      slug,
      hasVisited ? "Page revisited" : "Page visited",
      { path: pathname },
      "page_view",
    );
  }, [pathname]);

  return null;
}
