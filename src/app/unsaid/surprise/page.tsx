"use client";

import { useState } from "react";
import Link from "next/link";

export default function SurprisePage() {
  const [opened, setOpened] = useState(false);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#10070d] px-5 py-16 text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-rose-600/15 blur-[120px]" />
        <div className="absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-pink-500/10 blur-[120px]" />
      </div>

      {/* Decorative hearts */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, index) => (
          <span
            key={index}
            className="absolute animate-[float_7s_ease-in-out_infinite] text-pink-300/20"
            style={{
              left: `${(index * 37) % 100}%`,
              top: `${(index * 23) % 100}%`,
              fontSize: `${14 + (index % 4) * 8}px`,
              animationDelay: `${index * 0.4}s`,
            }}
          >
            {index % 2 === 0 ? "♡" : "✦"}
          </span>
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-xl text-center">
        {!opened ? (
          <>
            <div className="mb-5 inline-flex rounded-full border border-pink-300/20 bg-pink-300/5 px-4 py-2 text-xs tracking-[0.25em] text-pink-200">
              SOMETHING SPECIAL FOR YOU
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl">
              A Little <span className="italic text-pink-300">Surprise</span>
            </h1>

            <p className="mx-auto mt-5 max-w-sm text-sm leading-7 text-white/50">
              There's something waiting for you. Take a little moment and open
              it whenever you're ready.
            </p>

            {/* Gift box */}
            <button
              onClick={() => setOpened(true)}
              aria-label="Open your surprise gift"
              className="group relative mx-auto mt-16 block h-64 w-64 cursor-pointer transition duration-500 hover:-translate-y-3"
            >
              {/* Glow */}
              <div className="absolute inset-0 rounded-full bg-pink-500/20 blur-[60px] transition group-hover:bg-pink-500/30" />

              {/* Lid */}
              <div className="absolute left-0 top-14 z-20 h-12 w-full rounded-lg border border-pink-200/30 bg-gradient-to-b from-pink-300 to-rose-500 shadow-lg shadow-rose-500/20 transition duration-500 group-hover:-translate-y-5">
                <div className="absolute left-1/2 top-0 h-full w-8 -translate-x-1/2 bg-[#ffe0e7]" />

                {/* Bow */}
                <div className="absolute -top-9 left-1/2 flex -translate-x-1/2 items-center">
                  <div className="h-9 w-12 rounded-[80%_20%_80%_20%] border border-pink-200/40 bg-pink-200 shadow-lg" />
                  <div className="-ml-1 h-9 w-12 rounded-[20%_80%_20%_80%] border border-pink-200/40 bg-rose-300 shadow-lg" />
                  <div className="absolute left-1/2 top-2 h-5 w-5 -translate-x-1/2 rounded-full bg-pink-100" />
                </div>
              </div>

              {/* Box body */}
              <div className="absolute bottom-5 left-4 right-4 top-24 overflow-hidden rounded-b-xl border border-pink-200/20 bg-gradient-to-br from-rose-400 to-rose-700 shadow-2xl shadow-rose-900/40">
                <div className="absolute inset-y-0 left-1/2 w-9 -translate-x-1/2 bg-[#ffe0e7]" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="relative z-10 mt-4 text-4xl text-rose-700">
                    ♡
                  </span>
                </div>
              </div>
            </button>

            <p className="mt-8 animate-pulse text-xs tracking-[0.3em] text-pink-300/70">
              TAP THE GIFT TO OPEN ♡
            </p>
          </>
        ) : (
          <div className="animate-[reveal_1s_ease-out]">
            <div className="mb-7 text-6xl text-pink-300">♡</div>

            <div className="rounded-3xl border border-pink-300/20 bg-white/[0.04] p-8 shadow-2xl shadow-rose-950/30 backdrop-blur-xl sm:p-12">
              <p className="text-xs tracking-[0.3em] text-pink-300/70">
                YOUR LITTLE SURPRISE
              </p>

              <h2 className="mt-6 font-serif text-4xl italic text-pink-100 sm:text-5xl">
                A message for you...
              </h2>

              <div className="mx-auto my-8 h-px w-20 bg-pink-300/40" />

              <p className="font-serif text-xl leading-9 text-white/80">
                You may not realize it, but your presence can make an ordinary
                day feel a little more beautiful.
              </p>

              <p className="mt-6 text-sm leading-7 text-white/50">
                This little gift doesn't expect anything in return. It's simply
                a small way of sharing a thought that was on my mind.
              </p>

              <div className="mt-8 font-serif text-lg italic text-pink-300">
                With a little warmth, ♡
              </div>
            </div>

            <button
              onClick={() => setOpened(false)}
              className="mt-8 rounded-full border border-pink-300/25 px-7 py-3 text-sm text-pink-200 transition hover:bg-pink-300/10"
            >
              Close the surprise ↻
            </button>
          </div>
        )}

        <footer className="mt-16">
          <Link
            href="/for-you"
            className="text-sm text-white/40 transition hover:text-pink-200"
          >
            ← Back to the beginning
          </Link>
        </footer>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-25px) rotate(15deg);
          }
        }

        @keyframes reveal {
          from {
            opacity: 0;
            transform: translateY(25px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </main>
  );
}
