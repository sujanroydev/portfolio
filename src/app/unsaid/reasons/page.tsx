"use client";

import { useState } from "react";
import Link from "next/link";

const reasons = [
  {
    title: "Your Smile",
    description: "It has a way of making an ordinary moment feel special.",
    icon: "♡",
  },
  {
    title: "Your Personality",
    description: "There's something about the way you are that stands out.",
    icon: "✦",
  },
  {
    title: "Your Presence",
    description: "Even a simple moment feels different when you're around.",
    icon: "☁",
  },
  {
    title: "The Little Things",
    description:
      "Sometimes it's the smallest details that leave the biggest impression.",
    icon: "❀",
  },
  {
    title: "Your Uniqueness",
    description: "You don't need to be anyone else. Being yourself is enough.",
    icon: "✧",
  },
  {
    title: "Your Conversations",
    description: "Even the simplest conversations can stay in my thoughts.",
    icon: "☏",
  },
  {
    title: "Your Energy",
    description: "There's a certain warmth in the way you carry yourself.",
    icon: "♡",
  },
  {
    title: "Your Kindness",
    description:
      "The little ways you treat people can mean more than you know.",
    icon: "❋",
  },
  {
    title: "The Memories",
    description: "Some moments become memorable without even trying.",
    icon: "☆",
  },
  {
    title: "Simply You",
    description:
      "Because sometimes, there isn't one particular reason. It's just you.",
    icon: "♥",
  },
];

export default function ReasonsPage() {
  const [revealed, setRevealed] = useState<number[]>([]);
  const [showFinal, setShowFinal] = useState(false);

  const revealReason = (index: number) => {
    setRevealed((current) =>
      current.includes(index) ? current : [...current, index],
    );
  };

  const revealAll = () => {
    setRevealed(reasons.map((_, index) => index));
    setShowFinal(true);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#10070d] px-5 py-16 text-white">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-rose-600/10 blur-[120px]" />
        <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-pink-500/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        {/* Header */}
        <header className="mb-16 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-pink-300/20 bg-pink-300/5 px-4 py-2 text-xs tracking-[0.25em] text-pink-200">
            A LITTLE SOMETHING FOR YOU ♡
          </div>

          <h1 className="font-serif text-5xl font-medium leading-tight sm:text-7xl">
            10 Little Things
            <br />
            <span className="italic text-pink-300">I Like About You</span>
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-white/50 sm:text-base">
            No grand explanations. Just ten little thoughts that I wanted you to
            know.
          </p>

          <div className="mt-8 text-3xl text-pink-300/80">✦ ♡ ✦</div>
        </header>

        {/* Progress */}
        <div className="mx-auto mb-10 max-w-xl">
          <div className="mb-3 flex items-center justify-between text-xs text-white/50">
            <span>REASONS DISCOVERED</span>
            <span>{revealed.length} / 10</span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-rose-500 to-pink-300 transition-all duration-700"
              style={{ width: `${revealed.length * 10}%` }}
            />
          </div>
        </div>

        {/* Cards */}
        <section className="grid gap-4 sm:grid-cols-2">
          {reasons.map((reason, index) => {
            const isRevealed = revealed.includes(index);

            return (
              <button
                key={reason.title}
                onClick={() => revealReason(index)}
                className={`group relative min-h-40 overflow-hidden rounded-2xl border p-6 text-left transition-all duration-500 ${
                  isRevealed
                    ? "border-pink-300/30 bg-pink-300/[0.08]"
                    : "border-white/10 bg-white/[0.03] hover:border-pink-300/30 hover:bg-white/[0.06]"
                }`}
              >
                <div className="absolute -right-5 -top-8 font-serif text-8xl text-pink-300/[0.06]">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="relative flex items-start gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-pink-300/20 bg-pink-300/10 text-xl text-pink-300">
                    {isRevealed ? reason.icon : "♡"}
                  </div>

                  <div className="flex-1">
                    <p className="text-[10px] tracking-[0.25em] text-pink-300/60">
                      REASON {String(index + 1).padStart(2, "0")}
                    </p>

                    {isRevealed ? (
                      <>
                        <h2 className="mt-2 font-serif text-xl text-pink-100">
                          {reason.title}
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-white/55">
                          {reason.description}
                        </p>
                      </>
                    ) : (
                      <>
                        <h2 className="mt-2 font-serif text-xl text-white/70">
                          A little reason...
                        </h2>
                        <p className="mt-2 text-sm text-white/35">
                          Tap to discover
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </section>

        {/* Reveal all */}
        {revealed.length < reasons.length && (
          <div className="mt-12 text-center">
            <button
              onClick={revealAll}
              className="rounded-full bg-gradient-to-r from-rose-500 to-pink-400 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-rose-500/20 transition hover:-translate-y-1 hover:shadow-rose-500/30"
            >
              Reveal all 10 reasons ♡
            </button>
          </div>
        )}

        {/* Final message */}
        {showFinal && revealed.length === reasons.length && (
          <section className="mt-16 animate-[fadeIn_1s_ease-out] rounded-3xl border border-pink-300/20 bg-gradient-to-br from-pink-300/[0.08] to-transparent p-8 text-center sm:p-12">
            <div className="text-4xl text-pink-300">♡</div>

            <h2 className="mt-5 font-serif text-3xl italic text-pink-100 sm:text-4xl">
              And that's just the beginning...
            </h2>

            <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-white/55">
              These are just a few little things. You don't have to feel the
              same way, but I wanted to share them with you.
            </p>

            <p className="mt-7 text-xs tracking-[0.25em] text-pink-300/60">
              WITH A LITTLE COURAGE ♡
            </p>
          </section>
        )}

        {/* Footer */}
        <footer className="mt-20 text-center">
          <Link
            href="/unsaid"
            className="inline-flex rounded-full border border-pink-300/20 px-7 py-3 text-sm text-pink-200 transition hover:border-pink-300/50 hover:bg-pink-300/10"
          >
            ← Back to the beginning
          </Link>
        </footer>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
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
