"use client";

import { useState } from "react";
import Link from "next/link";

export default function WishPage() {
  const [wish, setWish] = useState("");
  const [released, setReleased] = useState(false);
  const [showWish, setShowWish] = useState(false);

  function releaseWish() {
    if (!wish.trim()) return;
    setReleased(true);
  }

  function makeAnotherWish() {
    setWish("");
    setReleased(false);
    setShowWish(false);
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080b1b] px-5 py-12 text-white">
      {/* Night sky glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-purple-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-rose-500/10 blur-[120px]" />

      {/* Stars */}
      {Array.from({ length: 50 }, (_, i) => (
        <span
          key={i}
          className="pointer-events-none absolute animate-pulse text-white/40"
          style={{
            left: `${(i * 37 + 11) % 100}%`,
            top: `${(i * 53 + 9) % 100}%`,
            fontSize: `${5 + (i % 3) * 3}px`,
            animationDelay: `${(i % 6) * 0.4}s`,
          }}
        >
          ✦
        </span>
      ))}

      <div className="relative w-full max-w-xl">
        <Link
          href="/for-you"
          className="mb-10 inline-flex items-center gap-2 text-sm text-white/45 transition hover:text-purple-300"
        >
          ← Back to home
        </Link>

        <section className="rounded-3xl border border-white/10 bg-white/[0.045] p-7 text-center shadow-2xl backdrop-blur-xl sm:p-12">
          {!released ? (
            <>
              <div className="mb-7 text-6xl">🌠</div>

              <p className="text-xs uppercase tracking-[0.4em] text-purple-300">
                A little moment for yourself
              </p>

              <h1 className="mt-5 font-serif text-4xl font-light sm:text-5xl">
                Make a Wish
              </h1>

              <p className="mx-auto mt-5 max-w-sm text-sm leading-7 text-white/50">
                Close your eyes for a moment, think of something you'd love to
                see happen, and write your wish below.
              </p>

              <div className="mx-auto my-9 h-px w-20 bg-purple-300/40" />

              <label
                htmlFor="wish"
                className="mb-3 block text-left text-xs uppercase tracking-[0.2em] text-white/50"
              >
                Your little wish
              </label>

              <textarea
                id="wish"
                value={wish}
                onChange={(event) => setWish(event.target.value)}
                maxLength={200}
                rows={4}
                placeholder="I wish for..."
                className="w-full resize-none rounded-2xl border border-white/10 bg-black/20 p-5 font-serif text-base leading-7 text-white outline-none transition placeholder:text-white/25 focus:border-purple-300/50"
              />

              <div className="mt-2 flex justify-between text-xs text-white/30">
                <span>Your wish is yours alone.</span>
                <span>{wish.length}/200</span>
              </div>

              <button
                type="button"
                onClick={releaseWish}
                disabled={!wish.trim()}
                className="mt-7 w-full rounded-full bg-purple-300 px-7 py-4 text-sm font-medium text-[#17112b] transition hover:bg-purple-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Release my wish ✨
              </button>
            </>
          ) : (
            <div className="py-5">
              <div className="animate-[float_3s_ease-in-out_infinite] text-7xl">
                🌟
              </div>

              <p className="mt-7 text-xs uppercase tracking-[0.4em] text-purple-300">
                Into the universe
              </p>

              <h1 className="mt-4 font-serif text-4xl font-light sm:text-5xl">
                Wish released!
              </h1>

              <p className="mx-auto mt-5 max-w-sm text-sm leading-7 text-white/50">
                Your wish is now part of this little universe. Keep believing in
                what matters to you, and take small steps towards it.
              </p>

              <div className="my-9 rounded-2xl border border-purple-300/20 bg-purple-300/[0.06] p-6">
                <p className="mb-3 text-xs tracking-[0.3em] text-purple-300">
                  YOUR WISH
                </p>

                {showWish ? (
                  <p className="font-serif text-lg italic leading-8 text-white/85">
                    "{wish}"
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowWish(true)}
                    className="rounded-full border border-purple-300/30 px-6 py-3 text-sm text-purple-200 transition hover:bg-purple-300/10"
                  >
                    Reveal my wish
                  </button>
                )}
              </div>

              <p className="font-serif text-lg italic text-purple-200">
                "May the things you hope for find their way to you."
              </p>

              <button
                type="button"
                onClick={makeAnotherWish}
                className="mt-9 rounded-full border border-white/15 px-8 py-3 text-sm text-white/65 transition hover:border-purple-300/50 hover:text-purple-200"
              >
                Make another wish ↻
              </button>
            </div>
          )}
        </section>

        <p className="mt-8 text-center text-xs tracking-[0.3em] text-white/25">
          DREAM A LITTLE. BELIEVE A LITTLE. ♡
        </p>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
      `}</style>
    </main>
  );
}
