"use client";

import { useState } from "react";
import Link from "next/link";

const stars = [
  {
    id: 1,
    x: 15,
    y: 20,
    size: "text-2xl",
    message: "Some people make ordinary days feel a little more special. ✨",
  },
  {
    id: 2,
    x: 75,
    y: 15,
    size: "text-3xl",
    message: "I hope you never run out of reasons to smile. 🌷",
  },
  {
    id: 3,
    x: 45,
    y: 35,
    size: "text-xl",
    message: "Even the smallest moments can become beautiful memories. 💫",
  },
  {
    id: 4,
    x: 85,
    y: 48,
    size: "text-2xl",
    message: "You deserve all the happiness this universe has to offer. 🤍",
  },
  {
    id: 5,
    x: 22,
    y: 65,
    size: "text-3xl",
    message: "Keep being yourself. There is something lovely about that. 🌙",
  },
  {
    id: 6,
    x: 60,
    y: 75,
    size: "text-xl",
    message: "Some feelings don't need to be explained to be real. 💌",
  },
  {
    id: 7,
    x: 38,
    y: 85,
    size: "text-2xl",
    message: "I hope your dreams find their way to you, one by one. 🌠",
  },
  {
    id: 8,
    x: 90,
    y: 88,
    size: "text-xl",
    message: "A little reminder: you matter, and your happiness matters. ♡",
  },
];

export default function UniversePage() {
  const [selectedStar, setSelectedStar] = useState<
    (typeof stars)[number] | null
  >(null);

  const [discovered, setDiscovered] = useState<number[]>([]);

  function discoverStar(star: (typeof stars)[number]) {
    setSelectedStar(star);

    setDiscovered((previous) =>
      previous.includes(star.id) ? previous : [...previous, star.id],
    );
  }

  const allDiscovered = discovered.length === stars.length;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070817] px-5 py-10 text-white">
      {/* Nebula background */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-purple-700/20 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-pink-600/10 blur-[140px]" />

      {/* Background stars */}
      {Array.from({ length: 45 }, (_, index) => (
        <span
          key={index}
          className="pointer-events-none absolute animate-pulse text-white/30"
          style={{
            left: `${(index * 37 + 13) % 100}%`,
            top: `${(index * 53 + 7) % 100}%`,
            animationDelay: `${(index % 5) * 0.5}s`,
            fontSize: `${5 + (index % 3) * 2}px`,
          }}
        >
          ✦
        </span>
      ))}

      <div className="relative mx-auto max-w-5xl">
        <Link
          href="/unsaid"
          className="inline-flex items-center gap-2 text-sm text-white/45 transition hover:text-purple-300"
        >
          ← Back to home
        </Link>

        {/* Header */}
        <header className="mx-auto mb-10 mt-14 max-w-2xl text-center">
          <div className="mb-5 text-5xl">🌌</div>

          <p className="text-xs uppercase tracking-[0.4em] text-purple-300">
            A universe of little thoughts
          </p>

          <h1 className="mt-4 font-serif text-5xl font-light sm:text-7xl">
            Somewhere in
            <br />
            the Universe
          </h1>

          <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-white/50">
            There are little messages hidden among these stars. Pick one and see
            what it has to say.
          </p>
        </header>

        {/* Progress */}
        <div className="mx-auto mb-7 max-w-md">
          <div className="mb-2 flex justify-between text-xs text-white/40">
            <span>STARS DISCOVERED</span>
            <span>
              {discovered.length} / {stars.length}
            </span>
          </div>

          <div className="h-1 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-purple-300 transition-all duration-500"
              style={{
                width: `${(discovered.length / stars.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Interactive constellation */}
        <section className="relative mx-auto h-[480px] max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] shadow-2xl sm:h-[550px]">
          {/* Constellation lines */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M15 20 L45 35 L75 15 L85 48 L60 75 L38 85 L22 65"
              fill="none"
              stroke="#c4b5fd"
              strokeWidth="0.2"
              strokeDasharray="1 1"
            />
          </svg>

          {stars.map((star) => {
            const isDiscovered = discovered.includes(star.id);

            return (
              <button
                key={star.id}
                type="button"
                onClick={() => discoverStar(star)}
                aria-label={`Discover star ${star.id}`}
                aria-pressed={isDiscovered}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full p-3 transition duration-300 hover:scale-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-300 ${
                  isDiscovered
                    ? "text-purple-200 drop-shadow-[0_0_12px_rgba(196,181,253,0.9)]"
                    : "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] hover:text-purple-200"
                }`}
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                }}
              >
                <span className={star.size}>{isDiscovered ? "✦" : "★"}</span>
              </button>
            );
          })}

          <div className="pointer-events-none absolute bottom-5 left-0 right-0 text-center text-[10px] tracking-[0.3em] text-white/30">
            TAP THE STARS TO DISCOVER LITTLE MESSAGES
          </div>
        </section>

        {/* Completion */}
        {allDiscovered && (
          <div className="mt-8 rounded-2xl border border-purple-300/20 bg-purple-300/[0.06] p-7 text-center">
            <div className="mb-3 text-4xl">🌠</div>
            <h2 className="font-serif text-2xl text-purple-200">
              You've explored the whole sky!
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/50">
              Eight little stars, eight little reminders. I hope at least one
              made you smile.
            </p>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 py-8 text-center">
          <p className="font-serif text-xl italic text-white/50">
            "Even in an endless universe, little moments matter."
          </p>
          <p className="mt-4 text-2xl text-purple-300">✧</p>
        </footer>
      </div>

      {/* Star message modal */}
      {selectedStar && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#03030c]/85 p-5 backdrop-blur-md"
          onClick={() => setSelectedStar(null)}
          role="presentation"
        >
          <article
            role="dialog"
            aria-modal="true"
            aria-labelledby="star-message-title"
            className="relative w-full max-w-md rounded-3xl border border-purple-300/20 bg-[#111126] p-9 text-center shadow-[0_0_80px_rgba(139,92,246,0.15)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedStar(null)}
              aria-label="Close message"
              className="absolute right-5 top-4 text-2xl text-white/40 transition hover:text-white"
            >
              ×
            </button>

            <div className="mb-6 animate-pulse text-6xl text-purple-200">✦</div>

            <p className="text-xs tracking-[0.35em] text-purple-300">
              A MESSAGE FROM THE STARS
            </p>

            <h2
              id="star-message-title"
              className="mt-5 font-serif text-3xl font-light"
            >
              A little thought
            </h2>

            <p className="mt-7 font-serif text-lg leading-9 text-white/75">
              {selectedStar.message}
            </p>

            <p className="mt-8 text-2xl text-purple-300">♡</p>

            <button
              type="button"
              onClick={() => setSelectedStar(null)}
              className="mt-5 rounded-full border border-purple-300/30 px-8 py-3 text-sm text-purple-200 transition hover:bg-purple-300/10"
            >
              Back to the stars
            </button>
          </article>
        </div>
      )}
    </main>
  );
}
