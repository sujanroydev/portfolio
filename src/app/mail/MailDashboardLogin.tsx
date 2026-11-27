"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

interface MailDashboardLoginProps {
  configured: boolean;
}

export default function MailDashboardLogin({
  configured,
}: MailDashboardLoginProps) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!configured || submitting) return;

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/mail/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result: unknown = await response.json();
      const message =
        typeof result === "object" &&
        result !== null &&
        "message" in result &&
        typeof result.message === "string"
          ? result.message
          : "Unable to sign in.";

      if (!response.ok) {
        setError(message);
        return;
      }

      setPassword("");
      router.refresh();
    } catch {
      setError("Could not reach the sign-in service. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#101316] dark:text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-5 py-12">
        <Link
          href="/"
          className="mb-8 text-sm font-medium text-slate-600 no-underline hover:text-teal-700 dark:text-slate-300 dark:hover:text-accent"
        >
          ← Back to portfolio
        </Link>
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-white/10 dark:bg-[#181c20]">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-accent">
            Private dashboard
          </p>
          <h1 className="font-[var(--font-inter)] text-2xl font-semibold tracking-tight">
            Sign in to continue
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
            Enter the email dashboard password to open the composer.
          </p>

          {configured ? (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="mail-dashboard-password"
                  className="mb-2 block text-sm font-medium"
                >
                  Dashboard password
                </label>
                <input
                  id="mail-dashboard-password"
                  type="password"
                  autoComplete="current-password"
                  required
                  maxLength={512}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-teal-600 dark:border-white/10 dark:bg-[#111518]"
                />
              </div>
              <button
                type="submit"
                disabled={!password || submitting}
                className="min-h-12 w-full rounded-xl bg-teal-700 px-5 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-accent dark:text-[#08120f] dark:hover:bg-[#6ff5d4]"
              >
                {submitting ? "Signing in…" : "Sign in"}
              </button>
              {error && (
                <p
                  role="alert"
                  className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800 dark:border-rose-400/20 dark:bg-[#2b171b] dark:text-rose-200"
                >
                  {error}
                </p>
              )}
            </form>
          ) : (
            <p
              role="alert"
              className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-300/20 dark:bg-amber-300/10 dark:text-amber-200"
            >
              Dashboard sign-in requires a unique server-side
              EMAIL_DASHBOARD_PASSWORD with at least 24 characters.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
