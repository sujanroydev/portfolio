"use client";

import { useState } from "react";
import Link from "next/link";

const SECRET_CODE = "143";

export default function SecretPage() {
  const [code, setCode] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const [showHint, setShowHint] = useState(false);

  function unlockSecret() {
    if (code.trim() === SECRET_CODE) {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  function resetSecret() {
    setCode("");
    setUnlocked(false);
    setError(false);
    setShowHint(false);
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#100b12] px-5 py-12 text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-500/[0.08] blur-[120px]" />

      {/* Floating decorations */}
      <div className="pointer-events-none absolute left-[12%] top-[15%] animate-pulse text-rose-300/30">
        ✦
      </div>
      <div className="pointer-events-none absolute right-[15%] top-[25%] animate-pulse text-rose-300/40">
        ♡
      </div>
      <div className="pointer-events-none absolute bottom-[20%] left-[20%] animate-pulse text-purple-300/30">
        ✧
      </div>
      <div className="pointer-events-none absolute bottom-[15%] right-[12%] animate-pulse text-rose-300/30">
        ♡
      </div>

      <div className="relative w-full max-w-md">
        <Link
          href="/unsaid"
          className="mb-10 inline-flex items-center gap-2 text-sm text-white/45 transition hover:text-rose-300"
        >
          ← Back to home
        </Link>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 text-center shadow-2xl backdrop-blur-xl sm:p-10">
          {!unlocked ? (
            <>
              <div className="mb-7 text-6xl">🔐</div>

              <p className="text-xs uppercase tracking-[0.4em] text-rose-300">
                A little mystery
              </p>

              <h1 className="mt-4 font-serif text-4xl font-light">
                Something secret...
              </h1>

              <p className="mx-auto mt-5 max-w-xs text-sm leading-7 text-white/50">
                There's a little message hidden here. Enter the secret code to
                discover it.
              </p>

              <div className="mx-auto mt-9 max-w-xs">
                <label
                  htmlFor="secret-code"
                  className="mb-3 block text-left text-xs uppercase tracking-[0.2em] text-white/50"
                >
                  Enter secret code
                </label>

                <input
                  id="secret-code"
                  type="password"
                  inputMode="numeric"
                  autoComplete="off"
                  maxLength={10}
                  value={code}
                  onChange={(event) => {
                    setCode(event.target.value);
                    setError(false);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") unlockSecret();
                  }}
                  placeholder="••••"
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-5 py-4 text-center text-xl tracking-[0.5em] text-white outline-none transition placeholder:text-white/20 focus:border-rose-300/60"
                />

                {error && (
                  <p className="mt-3 text-sm text-rose-300" role="alert">
                    Hmm... that's not the right code. Try again.
                  </p>
                )}

                <button
                  type="button"
                  onClick={unlockSecret}
                  disabled={!code.trim()}
                  className="mt-5 w-full rounded-xl bg-rose-300 px-6 py-4 text-sm font-medium text-[#24131c] transition hover:bg-rose-200 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Unlock the secret ✨
                </button>

                <button
                  type="button"
                  onClick={() => setShowHint(!showHint)}
                  className="mt-6 text-xs text-white/40 underline decoration-white/20 underline-offset-4 transition hover:text-rose-300"
                >
                  {showHint ? "Hide hint" : "Need a hint?"}
                </button>

                {showHint && (
                  <p className="mt-4 rounded-lg bg-white/[0.05] p-4 text-sm text-rose-200/80">
                    Three digits. A little way of saying "I love you."
                  </p>
                )}
              </div>
            </>
          ) : (
            <div className="animate-[fadeIn_0.7s_ease-out]">
              <div className="mb-7 text-6xl">💌</div>

              <p className="text-xs uppercase tracking-[0.4em] text-rose-300">
                Secret unlocked
              </p>

              <h1 className="mt-5 font-serif text-4xl font-light">
                A little confession
              </h1>

              <div className="mx-auto my-7 h-px w-20 bg-rose-300/50" />

              <p className="font-serif text-lg leading-9 text-white/80">
                There's something I wanted you to know...
              </p>

              <p className="mt-5 font-serif text-base leading-8 text-white/65">
                You have become someone I genuinely enjoy talking to. Even the
                smallest conversations sometimes leave me smiling.
              </p>

              <p className="mt-5 font-serif text-base leading-8 text-white/65">
                I don't know what the future holds, and I don't want to assume
                how you feel. I just wanted to be honest about the little
                happiness you bring into my ordinary days.
              </p>

              <p className="mt-7 font-serif text-xl italic text-rose-300">
                That's my little secret. ♡
              </p>

              <p className="mt-3 text-xs tracking-widest text-white/35">
                NO EXPECTATIONS. JUST HONESTY.
              </p>

              <button
                type="button"
                onClick={resetSecret}
                className="mt-9 rounded-full border border-white/15 px-7 py-3 text-sm text-white/65 transition hover:border-rose-300/50 hover:text-rose-300"
              >
                Lock it again ↻
              </button>
            </div>
          )}
        </div>

        <p className="mt-8 text-center text-xs tracking-[0.25em] text-white/25">
          SOME THINGS ARE BETTER SAID QUIETLY ♡
        </p>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}
