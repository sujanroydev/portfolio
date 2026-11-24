"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EnterPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleUnlock(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!password.trim()) {
      setError("A little password is needed first. 💗");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/unsaid/unlock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "That doesn't seem right. Try again. 💌");
        return;
      }

      router.replace("/unsaid");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0d0d0d] px-5 py-12 text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-900/20 blur-[120px]" />

      {/* Floating hearts */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="absolute animate-float text-rose-300/20"
            style={{
              left: `${(i * 37 + 8) % 100}%`,
              bottom: "-30px",
              fontSize: `${14 + (i % 4) * 8}px`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${9 + (i % 5) * 2}s`,
            }}
          >
            ♥
          </span>
        ))}
      </div>

      {/* Main card */}
      <div className="relative z-10 w-full max-w-md rounded-[2rem] border border-rose-200/10 bg-[#171216]/90 p-8 shadow-[0_25px_100px_rgba(190,24,93,0.12)] backdrop-blur-xl sm:p-10">
        <div className="text-center">
          <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full border border-rose-300/20 bg-rose-300/[0.07] text-4xl shadow-[0_0_40px_rgba(244,114,182,0.12)]">
            🔐
          </div>

          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.45em] text-rose-300">
            A little something for you
          </p>

          <h1 className="font-serif text-4xl text-rose-100 sm:text-5xl">
            Just for you
          </h1>

          <p className="mx-auto mt-5 max-w-xs text-sm leading-7 text-white/50">
            This little corner of the internet has been kept special. There's
            just one thing you need to enter before stepping inside.
          </p>
        </div>

        <form onSubmit={handleUnlock} className="mt-10 space-y-5">
          <div>
            <label
              htmlFor="password"
              className="mb-3 block text-xs font-medium uppercase tracking-[0.2em] text-rose-200/70"
            >
              Your special password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Enter the secret password..."
                autoComplete="current-password"
                className="w-full rounded-xl border border-rose-200/15 bg-black/30 px-5 py-4 pr-16 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-rose-300/60 focus:ring-2 focus:ring-rose-300/10"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-rose-200/60 transition hover:text-rose-200"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg border border-rose-400/20 bg-rose-400/5 px-4 py-3 text-center text-xs text-rose-300"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-rose-400 to-pink-500 px-5 py-4 text-sm font-semibold text-[#260e19] shadow-lg shadow-rose-500/10 transition duration-300 hover:-translate-y-0.5 hover:shadow-rose-500/25 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Opening..." : "Unlock this little world"}
            {!loading && (
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            )}
          </button>
        </form>

        <div className="mt-9 text-center">
          <div className="mx-auto mb-5 h-px w-16 bg-gradient-to-r from-transparent via-rose-300/30 to-transparent" />
          <p className="font-serif text-sm italic text-rose-200/50">
            Some things are worth keeping special.
          </p>
          <p className="mt-3 text-xs text-white/20">Made with ♥</p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(-110vh) rotate(35deg);
            opacity: 0;
          }
        }

        .animate-float {
          animation: float 12s linear infinite;
        }
      `}</style>
    </main>
  );
}
