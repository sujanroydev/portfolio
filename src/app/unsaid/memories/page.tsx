"use client";

import { useState } from "react";
import Link from "next/link";

const memories = [
  {
    date: "A LITTLE MOMENT",
    title: "Your Smile",
    description:
      "Some smiles stay in your mind long after the moment has passed.",
    image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=900",
    rotation: "-2deg",
  },
  {
    date: "A BEAUTIFUL THOUGHT",
    title: "Little Things",
    description:
      "Sometimes the smallest things become the most meaningful memories.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900",
    rotation: "2deg",
  },
  {
    date: "SOMETHING SPECIAL",
    title: "A Quiet Evening",
    description: "Not every beautiful moment needs words to make it special.",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=900",
    rotation: "-1deg",
  },
  {
    date: "A THOUGHT TO KEEP",
    title: "Beautiful Moments",
    description: "Some moments are worth keeping, even when they are simple.",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900",
    rotation: "2deg",
  },
];

export default function MemoriesPage() {
  const [selectedMemory, setSelectedMemory] = useState<
    (typeof memories)[number] | null
  >(null);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#10070d] px-5 py-16 text-white">
      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-rose-600/10 blur-[120px]" />
        <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-pink-500/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-16 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-pink-300/20 bg-pink-300/5 px-4 py-2 text-xs tracking-[0.25em] text-pink-200">
            <span>♡</span>
            LITTLE PIECES OF HAPPINESS
          </div>

          <h1 className="font-serif text-5xl font-medium tracking-tight sm:text-7xl">
            A Book of <span className="italic text-pink-300">Memories</span>
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-white/50 sm:text-base">
            A little collection of beautiful moments, lovely thoughts, and
            things worth remembering.
          </p>

          <div className="mt-8 text-3xl text-pink-300/80">✦ ♡ ✦</div>
        </header>

        {/* Memory gallery */}
        <section className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {memories.map((memory, index) => (
            <button
              key={memory.title}
              onClick={() => setSelectedMemory(memory)}
              className="group text-left transition duration-500 hover:-translate-y-3"
              style={{
                transform: `rotate(${memory.rotation})`,
              }}
            >
              <div className="rounded-sm bg-[#f5e9df] p-3 pb-6 shadow-2xl shadow-black/40 transition duration-500 group-hover:rotate-0">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#e8d8ce]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={memory.image}
                    alt={memory.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                  <span className="absolute bottom-3 right-3 text-2xl text-white">
                    ♡
                  </span>
                </div>

                <div className="px-2 pt-4 text-center text-[#49323b]">
                  <p className="text-[9px] font-semibold tracking-[0.25em] text-[#a77b8b]">
                    {memory.date}
                  </p>

                  <h2 className="mt-2 font-serif text-xl italic">
                    {memory.title}
                  </h2>

                  <p className="mt-2 text-xs text-[#876d75]">
                    Click to remember ♡
                  </p>
                </div>
              </div>
            </button>
          ))}
        </section>

        {/* Closing message */}
        <section className="mx-auto mt-24 max-w-2xl text-center">
          <div className="mb-5 text-4xl text-pink-300">❝</div>

          <p className="font-serif text-2xl italic leading-relaxed text-white/80 sm:text-3xl">
            Some moments may be small, but the feelings attached to them can be
            unforgettable.
          </p>

          <p className="mt-6 text-xs tracking-[0.3em] text-pink-300/60">
            EVERY LITTLE MOMENT MATTERS
          </p>
        </section>

        {/* Navigation */}
        <footer className="mt-20 flex justify-center">
          <Link
            href="/for-you"
            className="rounded-full border border-pink-300/20 px-7 py-3 text-sm text-pink-200 transition hover:border-pink-300/50 hover:bg-pink-300/10"
          >
            ← Back to the beginning
          </Link>
        </footer>
      </div>

      {/* Memory popup */}
      {selectedMemory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5 backdrop-blur-md"
          onClick={() => setSelectedMemory(null)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl border border-pink-200/20 bg-[#1c0d17] p-5 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMemory(null)}
              className="absolute right-4 top-4 z-10 text-2xl text-white/60 hover:text-white"
              aria-label="Close memory"
            >
              ×
            </button>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedMemory.image}
              alt={selectedMemory.title}
              className="mb-6 aspect-[4/3] w-full rounded-xl object-cover"
            />

            <p className="text-xs tracking-[0.25em] text-pink-300">
              {selectedMemory.date}
            </p>

            <h2 className="mt-3 font-serif text-3xl italic">
              {selectedMemory.title}
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/60">
              {selectedMemory.description}
            </p>

            <div className="mt-6 text-right text-xl text-pink-300">♡</div>
          </div>
        </div>
      )}
    </main>
  );
}
