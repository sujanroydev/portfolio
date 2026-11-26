"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { UnsaidActivity, UnsaidResponse } from "@/lib/unsaid/types";

type Overview = {
  totalActivities: number;
  totalPageVisits: number;
  totalResponses: number;
  uniquePages: number;
  firstActivity: string | null;
  mostRecentActivity: string | null;
};

type PageStat = {
  page_slug: string;
  activity_count: number;
  visits: number;
  responses: number;
  most_recent: string;
};

const pageNames: Record<string, string> = {
  index: "Home", questions: "Questions", love: "Love", constellation: "Constellation",
  feelings: "Feelings", letter: "Letter", memories: "Memories", reasons: "Reasons",
  surprise: "Surprise", if: "If...", roulette: "Memory Roulette", "open-when": "Open When",
  diary: "Diary", jar: "Jar of Hearts", scrapbook: "Scrapbook", secret: "Secret",
  gallery: "Gallery", songs: "Songs", "this-or-that": "This or That", time: "Countdown",
  universe: "Universe", wish: "Make a Wish",
};

function formatDate(value: string | null) {
  if (!value) return "No records";
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium", timeStyle: "short",
  }).format(new Date(value));
}

function answerLabel(value: unknown) {
  if (typeof value === "string") return value;
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (Array.isArray(value)) return value.join(", ");
  if (value && typeof value === "object") return JSON.stringify(value, null, 2);
  return String(value ?? "");
}

export default function DeshboardPage() {
  const [tab, setTab] = useState<"timeline" | "responses" | "pages">("timeline");
  const [activities, setActivities] = useState<UnsaidActivity[]>([]);
  const [responses, setResponses] = useState<UnsaidResponse[]>([]);
  const [overview, setOverview] = useState<Overview | null>(null);
  const [pages, setPages] = useState<PageStat[]>([]);
  const [search, setSearch] = useState("");
  const [pageSlug, setPageSlug] = useState("");
  const [eventType, setEventType] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [sort, setSort] = useState<"desc" | "asc">("desc");
  const [activityPage, setActivityPage] = useState(1);
  const [responsePage, setResponsePage] = useState(1);
  const [activityTotal, setActivityTotal] = useState(0);
  const [responseTotal, setResponseTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const limit = 20;

  const loadSummary = useCallback(async () => {
    const result = await fetch("/api/unsaid/dashboard", { cache: "no-store" });
    if (!result.ok) throw new Error("Unable to load dashboard summary.");
    const data = await result.json();
    setOverview(data.overview);
    setPages(data.pages);
  }, []);

  const loadActivities = useCallback(async () => {
    const params = new URLSearchParams({ page: String(activityPage), limit: String(limit), sort });
    if (search) params.set("search", search);
    if (pageSlug) params.set("page_slug", pageSlug);
    if (eventType) params.set("event_type", eventType);
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    const result = await fetch(`/api/unsaid/activities?${params}`, { cache: "no-store" });
    if (!result.ok) throw new Error("Unable to load activities.");
    const data = await result.json();
    setActivities(data.activities);
    setActivityTotal(data.pagination.total);
  }, [activityPage, search, pageSlug, eventType, from, to, sort]);

  const loadResponses = useCallback(async () => {
    const params = new URLSearchParams({ page: String(responsePage), limit: String(limit), sort });
    if (search) params.set("search", search);
    if (pageSlug) params.set("page_slug", pageSlug);
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    const result = await fetch(`/api/unsaid/responses?${params}`, { cache: "no-store" });
    if (!result.ok) throw new Error("Unable to load responses.");
    const data = await result.json();
    setResponses(data.responses);
    setResponseTotal(data.pagination.total);
  }, [responsePage, search, pageSlug, from, to, sort]);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      await Promise.all([loadSummary(), loadActivities(), loadResponses()]);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to refresh.");
    } finally {
      setLoading(false);
    }
  }, [loadSummary, loadActivities, loadResponses]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void refresh();
    }, 0);
    return () => window.clearTimeout(timeout);
  }, [refresh]);

  const deleteActivity = async (id: string) => {
    if (!window.confirm("Delete this activity? This cannot be undone.")) return;
    const result = await fetch(`/api/unsaid/activities/${id}`, { method: "DELETE" });
    if (!result.ok) {
      setError("Unable to delete the activity.");
      return;
    }
    await refresh();
  };

  const resetFilters = () => {
    setSearch("");
    setPageSlug("");
    setEventType("");
    setFrom("");
    setTo("");
    setActivityPage(1);
    setResponsePage(1);
  };

  const pageOptions = useMemo(
    () => Array.from(new Set(pages.map((item) => item.page_slug))).sort(),
    [pages],
  );

  return (
    <main className="min-h-screen bg-[#0d0d12] px-4 py-10 text-[#f7edf2] sm:px-7">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-pink-300/70">Private archive</p>
            <h1 className="mt-3 font-serif text-4xl sm:text-5xl">Unsaid <span className="italic text-pink-300">History</span></h1>
          </div>
          <button onClick={() => void refresh()} disabled={loading} className="rounded-full border border-pink-300/20 px-5 py-3 text-sm text-pink-100 transition hover:bg-pink-300/10 disabled:opacity-50">
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </header>

        {error && <div className="mb-6 rounded-xl border border-red-300/20 bg-red-300/10 px-4 py-3 text-sm text-red-200">{error}</div>}

        {overview && (
          <section className="mb-7 grid grid-cols-2 gap-3 lg:grid-cols-6">
            {[
              ["Total activities", overview.totalActivities],
              ["Page visits", overview.totalPageVisits],
              ["Responses", overview.totalResponses],
              ["Unique pages", overview.uniquePages],
              ["First activity", formatDate(overview.firstActivity)],
              ["Latest activity", formatDate(overview.mostRecentActivity)],
            ].map(([label, value]) => (
              <div key={String(label)} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/40">{label}</p>
                <p className="mt-2 text-lg text-pink-100">{value}</p>
              </div>
            ))}
          </section>
        )}

        <section className="mb-7 rounded-2xl border border-white/10 bg-white/[0.025] p-4">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-[minmax(180px,1fr)_150px_150px_140px_140px_130px_auto]">
            <input value={search} onChange={(event) => { setSearch(event.target.value); setActivityPage(1); setResponsePage(1); }} placeholder="Search activity or response..." className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none focus:border-pink-300/40" />
            <select value={pageSlug} onChange={(event) => { setPageSlug(event.target.value); setActivityPage(1); setResponsePage(1); }} className="rounded-xl border border-white/10 bg-[#17151b] px-3 py-3 text-sm">
              <option value="">All pages</option>
              {pageOptions.map((slug) => <option key={slug} value={slug}>{pageNames[slug] ?? slug}</option>)}
            </select>
            <select value={eventType} onChange={(event) => { setEventType(event.target.value); setActivityPage(1); }} className="rounded-xl border border-white/10 bg-[#17151b] px-3 py-3 text-sm">
              <option value="">All event types</option>
              {["page_view","response_submitted","option_selected","photo_opened","slideshow_started","slideshow_paused","activity_started","activity_completed","item_revealed","button_clicked","custom"].map((type) => <option key={type}>{type}</option>)}
            </select>
            <input type="date" value={from} onChange={(event) => setFrom(event.target.value)} className="rounded-xl border border-white/10 bg-[#17151b] px-3 py-3 text-sm" />
            <input type="date" value={to} onChange={(event) => setTo(event.target.value)} className="rounded-xl border border-white/10 bg-[#17151b] px-3 py-3 text-sm" />
            <select value={sort} onChange={(event) => setSort(event.target.value as "asc" | "desc")} className="rounded-xl border border-white/10 bg-[#17151b] px-3 py-3 text-sm">
              <option value="desc">Newest</option>
              <option value="asc">Oldest</option>
            </select>
            <button onClick={resetFilters} className="rounded-xl border border-white/10 px-4 py-3 text-sm text-white/60 hover:text-white">Reset</button>
          </div>
        </section>

        <nav className="mb-5 flex gap-2">
          {(["timeline","responses","pages"] as const).map((item) => (
            <button key={item} onClick={() => setTab(item)} className={`rounded-full px-5 py-2.5 text-sm capitalize ${tab === item ? "bg-pink-300 text-[#301421]" : "border border-white/10 text-white/55"}`}>
              {item === "pages" ? "Page analytics" : item}
            </button>
          ))}
        </nav>

        {tab === "timeline" && (
          <section>
            {loading ? <p className="py-12 text-center text-white/40">Loading history...</p> : activities.length === 0 ? <p className="py-12 text-center text-white/40">No activities found.</p> : (
              <div className="space-y-3">
                {activities.map((activity) => (
                  <article key={activity.id} className="rounded-2xl border border-white/10 bg-white/[0.025] p-4 sm:p-5">
                    <button onClick={() => setExpanded(expanded === activity.id ? null : activity.id)} className="w-full text-left">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="font-medium text-pink-100">{activity.event_name}</p>
                          <p className="mt-1 text-xs text-white/45">{pageNames[activity.page_slug] ?? activity.page_slug} · {activity.event_type}</p>
                        </div>
                        <time className="shrink-0 text-xs text-white/40">{formatDate(activity.created_at)}</time>
                      </div>
                    </button>
                    {expanded === activity.id && (
                      <pre className="mt-4 max-h-80 overflow-auto rounded-xl bg-black/30 p-4 text-xs text-white/65">{JSON.stringify(activity.event_data, null, 2)}</pre>
                    )}
                    <button onClick={() => void deleteActivity(activity.id)} className="mt-3 text-xs text-red-300/70 transition hover:text-red-200">Delete</button>
                  </article>
                ))}
              </div>
            )}
            <Pagination page={activityPage} total={activityTotal} limit={limit} onPage={setActivityPage} />
          </section>
        )}

        {tab === "responses" && (
          <section>
            {loading ? <p className="py-12 text-center text-white/40">Loading responses...</p> : responses.length === 0 ? <p className="py-12 text-center text-white/40">No responses found.</p> : (
              <div className="space-y-3">
                {responses.map((item) => (
                  <article key={item.id} className="rounded-2xl border border-pink-300/10 bg-pink-300/[0.035] p-5">
                    <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
                      <p className="text-xs uppercase tracking-[0.16em] text-pink-300/60">{pageNames[item.page_slug] ?? item.page_slug} · {item.question_id}</p>
                      <time className="text-xs text-white/40">{formatDate(item.created_at)}</time>
                    </div>
                    <p className="mt-3 font-serif text-lg text-white/85">{item.question_text}</p>
                    {typeof item.response === "object" && item.response !== null && !Array.isArray(item.response) ? (
                      <pre className="mt-4 overflow-auto rounded-xl bg-black/25 p-4 text-sm text-pink-100/80">{answerLabel(item.response)}</pre>
                    ) : (
                      <p className="mt-4 rounded-xl bg-black/25 px-4 py-3 text-sm text-pink-100/80">{answerLabel(item.response)}</p>
                    )}
                  </article>
                ))}
              </div>
            )}
            <Pagination page={responsePage} total={responseTotal} limit={limit} onPage={setResponsePage} />
          </section>
        )}

        {tab === "pages" && (
          <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {pages.map((item) => (
              <article key={item.page_slug} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                <h2 className="font-serif text-xl text-pink-100">{pageNames[item.page_slug] ?? item.page_slug}</h2>
                <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <div><dt className="text-white/40">Visits</dt><dd className="mt-1">{item.visits}</dd></div>
                  <div><dt className="text-white/40">Responses</dt><dd className="mt-1">{item.responses}</dd></div>
                  <div><dt className="text-white/40">Activities</dt><dd className="mt-1">{item.activity_count}</dd></div>
                  <div><dt className="text-white/40">Recent</dt><dd className="mt-1 text-xs">{formatDate(item.most_recent)}</dd></div>
                </dl>
              </article>
            ))}
            {pages.length === 0 && <p className="py-12 text-center text-white/40 sm:col-span-2 lg:col-span-3">No page analytics yet.</p>}
          </section>
        )}
      </div>
    </main>
  );
}

function Pagination({ page, total, limit, onPage }: { page: number; total: number; limit: number; onPage: (page: number) => void }) {
  const pages = Math.max(1, Math.ceil(total / limit));
  return (
    <div className="mt-6 flex items-center justify-between text-sm text-white/50">
      <button disabled={page <= 1} onClick={() => onPage(page - 1)} className="rounded-full border border-white/10 px-4 py-2 disabled:opacity-30">← Previous</button>
      <span>Page {page} of {pages}</span>
      <button disabled={page >= pages} onClick={() => onPage(page + 1)} className="rounded-full border border-white/10 px-4 py-2 disabled:opacity-30">Next →</button>
    </div>
  );
}
