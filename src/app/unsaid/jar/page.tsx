"use client";

import { useState } from "react";
import Link from "next/link";

const notes = [
  "Your smile has a way of making ordinary moments feel special. ♡",
  "You don't have to try to be interesting. You already are.",
  "The little things about you are worth noticing.",
  "I hope you never forget how special you are.",
  "You deserve all the happiness you wish for.",
  "There's something beautiful about being yourself.",
  "Your presence can make a normal day feel a little brighter.",
  "Never underestimate the beauty of your kindness.",
  "You make being yourself look effortless.",
  "I hope today gives you plenty of reasons to smile.",
  "Some people are simply nice to have around. You're one of them.",
  "Your thoughts, dreams, and little quirks all matter.",
  "You deserve someone who listens when you speak.",
  "Even your simplest stories can be worth hearing.",
  "Keep being the person you are. That's enough.",
  "I hope you always find reasons to believe in yourself.",
  "The world needs more people who are genuinely kind.",
  "You deserve peaceful days and beautiful surprises.",
  "Don't let a difficult day make you forget your worth.",
  "Just a little reminder: you're appreciated. ♡",
];

export default function JarPage() {
  const [currentNote, setCurrentNote] = useState<string | null>(null);
  const [discovered, setDiscovered] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);

  const pickNote = () => {
    const available = notes.filter((note) => !discovered.includes(note));

    if (available.length === 0) {
      setCurrentNote(null);
      return;
    }

    const randomNote = available[Math.floor(Math.random() * available.length)];

    setCurrentNote(randomNote);
    setDiscovered((previous) => [...previous, randomNote]);
    setHistory((previous) => [...previous, randomNote]);
  };

  const resetJar = () => {
    setCurrentNote(null);
    setDiscovered([]);
    setHistory([]);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#10070d] px-5 py-16 text-white">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-rose-600/10 blur-[120px]" />
        <div className="absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-pink-500/10 blur-[120px]" />
      </div>

      {/* Floating decorations */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {Array.from({ length: 14 }).map((_, index) => (
          <span
            key={index}
            className="absolute animate-[float_7s_ease-in-out_infinite] text-pink-300/20"
            style={{
              left: `${(index * 37) % 100}%`,
              top: `${(index * 23) % 100}%`,
              animationDelay: `${index * 0.4}s`,
              fontSize: `${14 + (index % 3) * 8}px`,
            }}
          >
            {index % 2 === 0 ? "♡" : "✦"}
          </span>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {/* Header */}
        <header>
          <div className="mb-5 inline-flex rounded-full border border-pink-300/20 bg-pink-300/5 px-4 py-2 text-xs tracking-[0.25em] text-pink-200">
            A JAR FULL OF LITTLE THOUGHTS
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl">
            A Little Jar of
            <br />
            <span className="italic text-pink-300">Happiness</span>
          </h1>

          <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-white/50">
            Whenever you need a smile, pick a little note from this jar. There's
            something sweet waiting inside.
          </p>
        </header>

        {/* Counter */}
        <div className="mt-9 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-xs text-white/60">
          <span className="text-pink-300">♡</span>
          {discovered.length} of {notes.length} notes discovered
        </div>

        {/* Jar */}
        <div className="relative mx-auto mt-14 flex h-80 w-64 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-pink-500/10 blur-[65px]" />

          <button
            onClick={pickNote}
            disabled={discovered.length === notes.length}
            aria-label="Pick a note from the jar"
            className="group relative h-72 w-52 cursor-pointer transition duration-500 hover:-translate-y-2 disabled:cursor-default disabled:opacity-60"
          >
            {/* Jar lid */}
            <div className="absolute left-10 top-3 z-20 h-8 w-32 rounded-lg border border-pink-200/40 bg-gradient-to-b from-pink-200 to-rose-400 shadow-lg">
              <div className="absolute inset-x-3 top-1 h-1 rounded-full bg-white/30" />
            </div>

            {/* Jar neck */}
            <div className="absolute left-12 top-9 z-10 h-8 w-28 rounded-t-lg border-x border-t border-white/30 bg-pink-200/10 backdrop-blur-md" />

            {/* Jar body */}
            <div className="absolute inset-x-0 bottom-2 top-12 overflow-hidden rounded-[35%_35%_22%_22%/15%_15%_12%_12%] border-2 border-white/30 bg-gradient-to-br from-white/15 via-pink-200/10 to-rose-300/10 shadow-[inset_0_0_35px_rgba(255,255,255,0.08),0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-sm">
              {/* Glass shine */}
              <div className="absolute left-5 top-8 h-36 w-3 rotate-3 rounded-full bg-white/20 blur-[2px]" />
              <div className="absolute right-5 top-14 h-20 w-1 rounded-full bg-white/20" />

              {/* Floating hearts */}
              {Array.from({ length: 12 }).map((_, index) => (
                <span
                  key={index}
                  className="absolute animate-[jarFloat_4s_ease-in-out_infinite] text-pink-200/90"
                  style={{
                    left: `${15 + ((index * 19) % 70)}%`,
                    bottom: `${12 + ((index * 17) % 65)}%`,
                    animationDelay: `${index * 0.3}s`,
                    fontSize: `${13 + (index % 3) * 5}px`,
                  }}
                >
                  {index % 3 === 0 ? "✦" : "♡"}
                </span>
              ))}

              {/* Jar label */}
              <div className="absolute left-1/2 top-1/2 w-36 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-pink-200/40 bg-[#f5e9df]/90 px-3 py-5 text-center shadow-xl">
                <span className="text-2xl text-rose-400">♡</span>
                <p className="mt-2 font-serif text-lg italic text-[#65434f]">
                  For You
                </p>
                <p className="mt-1 text-[8px] tracking-[0.25em] text-[#a77b8b]">
                  OPEN WITH A SMILE
                </p>
              </div>

              {/* Bottom glass reflection */}
              <div className="absolute bottom-3 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-white/20 blur-sm" />
            </div>
          </button>
        </div>

        {/* Instruction */}
        <p className="mt-2 text-xs tracking-[0.25em] text-pink-300/70">
          {discovered.length === notes.length
            ? "YOU FOUND EVERY LITTLE NOTE ♡"
            : "TAP THE JAR TO PICK A NOTE"}
        </p>

        {/* Note reveal */}
        {currentNote && (
          <section
            key={currentNote}
            className="mx-auto mt-12 max-w-lg animate-[noteReveal_0.6s_ease-out] rounded-sm bg-[#f5e9df] p-8 text-[#59413d] shadow-2xl sm:p-10"
          >
            <div className="text-3xl text-[#bd8298]">♡</div>

            <p className="mt-4 text-[10px] tracking-[0.3em] text-[#a77b8b]">
              A LITTLE NOTE FOR YOU
            </p>

            <p className="mt-6 font-serif text-xl italic leading-9 sm:text-2xl">
              "{currentNote}"
            </p>

            <div className="mt-7 text-right font-serif text-sm italic text-[#a77b8b]">
              With warmth ♡
            </div>
          </section>
        )}

        {/* All notes discovered */}
        {discovered.length === notes.length && !currentNote && (
          <section className="mx-auto mt-12 max-w-lg rounded-2xl border border-pink-300/20 bg-white/[0.04] p-8">
            <div className="text-4xl text-pink-300">✨</div>
            <h2 className="mt-4 font-serif text-3xl italic">
              Every note discovered!
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/50">
              You've found all the little messages in this jar. I hope they
              brought you a few smiles.
            </p>

            <button
              onClick={resetJar}
              className="mt-7 rounded-full border border-pink-300/30 px-6 py-3 text-sm text-pink-200 transition hover:bg-pink-300/10"
            >
              Fill the jar again ↻
            </button>
          </section>
        )}

        {/* Previous notes */}
        {history.length > 0 && (
          <section className="mx-auto mt-16 max-w-lg text-left">
            <h2 className="mb-5 font-serif text-2xl italic text-pink-100">
              Little notes you've found
            </h2>

            <div className="space-y-3">
              {history.map((note, index) => (
                <div
                  key={`${index}-${note}`}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <div className="flex gap-3">
                    <span className="text-pink-300">♡</span>
                    <p className="text-sm leading-6 text-white/60">{note}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="mt-20">
          <Link
            href="/unsaid"
            className="inline-flex rounded-full border border-pink-300/20 px-7 py-3 text-sm text-pink-200 transition hover:border-pink-300/50 hover:bg-pink-300/10"
          >
            ← Back to the beginning
          </Link>
        </footer>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes jarFloat {
          0%,
          100% {
            transform: translateY(0) rotate(-8deg);
          }
          50% {
            transform: translateY(-12px) rotate(8deg);
          }
        }

        @keyframes noteReveal {
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
          }
        }
      `}</style>
    </main>
  );
}
