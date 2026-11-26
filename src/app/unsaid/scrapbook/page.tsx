"use client";

import { useState } from "react";
import Link from "next/link";
import { trackActivity } from "@/lib/unsaid/track-activity";

const memories = [
  {
    id: 1,
    date: "A LITTLE MOMENT",
    title: "The little things",
    caption: "Sometimes the smallest moments become the sweetest memories.",
    image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=900",
    rotation: "-rotate-2",
    color: "bg-[#f5e5d5]",
  },
  {
    id: 2,
    date: "A BEAUTIFUL DAY",
    title: "A moment of peace",
    caption: "Some moments don't need words. They just need to be remembered.",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=900",
    rotation: "rotate-2",
    color: "bg-[#e8e9d9]",
  },
  {
    id: 3,
    date: "A HAPPY THOUGHT",
    title: "A little sunshine",
    caption: "A reminder that ordinary days can hold something beautiful.",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=900",
    rotation: "-rotate-1",
    color: "bg-[#f4e1e3]",
  },
  {
    id: 4,
    date: "SOMETHING TO KEEP",
    title: "Forever in a frame",
    caption: "Not every beautiful thing needs a reason to exist.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900",
    rotation: "rotate-1",
    color: "bg-[#e5e7df]",
  },
  {
    id: 5,
    date: "A QUIET EVENING",
    title: "Golden hours",
    caption: "Some evenings have a way of making everything feel lighter.",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900",
    rotation: "-rotate-2",
    color: "bg-[#f4e8d5]",
  },
  {
    id: 6,
    date: "A SMALL REMINDER",
    title: "Keep smiling",
    caption: "I hope life gives you a thousand reasons to smile.",
    image: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=900",
    rotation: "rotate-2",
    color: "bg-[#eee1ed]",
  },
];

export default function ScrapbookPage() {
  const [selectedMemory, setSelectedMemory] = useState<
    (typeof memories)[number] | null
  >(null);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f3e9dc] px-5 py-12 text-[#493a32] sm:px-8">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-rose-200/40 blur-[100px]" />
      <div className="pointer-events-none absolute -right-24 bottom-20 h-72 w-72 rounded-full bg-amber-200/50 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl">
        <Link
          href="/unsaid"
          className="inline-flex items-center gap-2 text-sm text-[#806b5e] transition hover:text-rose-600"
        >
          ← Back to home
        </Link>

        {/* Header */}
        <header className="mx-auto mb-16 mt-12 max-w-2xl text-center">
          <div className="mb-5 text-5xl">📒</div>

          <p className="mb-3 text-xs font-medium uppercase tracking-[0.4em] text-rose-500">
            Little pieces of happiness
          </p>

          <h1 className="font-serif text-5xl font-normal sm:text-7xl">
            Our Scrapbook
          </h1>

          <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-[#806b5e] sm:text-base">
            A little collection of moments, thoughts, and things worth
            remembering.
          </p>

          <div className="mx-auto mt-8 h-px w-24 bg-rose-300" />
        </header>

        {/* Scrapbook grid */}
        <section className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {memories.map((memory, index) => (
            <button
              key={memory.id}
              type="button"
              onClick={() => {
                setSelectedMemory(memory);
                void trackActivity("scrapbook", "Scrapbook memory opened", { memoryTitle: memory.title, memoryId: memory.id }, "item_revealed");
              }}
              className={`group relative mx-auto w-full max-w-sm transition duration-300 hover:z-10 hover:rotate-0 hover:scale-[1.03] ${memory.rotation}`}
            >
              {/* Paper card */}
              <div className="relative bg-[#fffdf8] p-4 pb-7 shadow-[0_8px_25px_rgba(80,50,30,0.12)]">
                {/* Tape */}
                <div className="absolute -top-3 left-1/2 z-10 h-7 w-20 -translate-x-1/2 rotate-[-3deg] bg-amber-200/70 shadow-sm" />

                {/* Photo */}
                <div className="overflow-hidden bg-[#eee5dc]">
                  <img
                    src={memory.image}
                    alt={memory.title}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Caption */}
                <div className="px-2 pt-5 text-center">
                  <p className="text-[10px] font-semibold tracking-[0.25em] text-rose-400">
                    {memory.date}
                  </p>

                  <h2 className="mt-2 font-serif text-2xl">{memory.title}</h2>

                  <p className="mt-2 font-serif text-sm italic leading-6 text-[#90796c]">
                    {memory.caption}
                  </p>
                </div>

                <span className="absolute bottom-2 right-4 text-lg text-rose-300">
                  ♡
                </span>
              </div>

              <span className="mt-4 block text-center text-xs tracking-widest text-[#a18a7b] opacity-0 transition group-hover:opacity-100">
                OPEN MEMORY ↗
              </span>
            </button>
          ))}
        </section>

        {/* Ending */}
        <footer className="mx-auto mt-24 max-w-xl border-t border-[#cdb9a7] py-12 text-center">
          <div className="mb-4 text-3xl">🌷</div>

          <p className="font-serif text-2xl italic text-[#765d50]">
            "Some moments deserve their own little place in time."
          </p>

          <p className="mt-5 text-xs tracking-[0.3em] text-[#a18a7b]">
            MADE WITH LOVE ♡
          </p>
        </footer>
      </div>

      {/* Memory popup */}
      {selectedMemory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#241b18]/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedMemory(null)}
          role="presentation"
        >
          <article
            role="dialog"
            aria-modal="true"
            aria-labelledby="memory-title"
            className="relative w-full max-w-lg rotate-0 bg-[#fffdf8] p-5 shadow-2xl sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close memory"
              onClick={() => setSelectedMemory(null)}
              className="absolute right-4 top-3 z-10 text-3xl text-[#806b5e] transition hover:text-rose-500"
            >
              ×
            </button>

            <div className="overflow-hidden bg-[#eee5dc]">
              <img
                src={selectedMemory.image}
                alt={selectedMemory.title}
                className="max-h-[45vh] w-full object-cover"
              />
            </div>

            <div className="py-7 text-center">
              <p className="text-xs tracking-[0.3em] text-rose-400">
                {selectedMemory.date}
              </p>

              <h2 id="memory-title" className="mt-3 font-serif text-3xl">
                {selectedMemory.title}
              </h2>

              <p className="mx-auto mt-4 max-w-sm font-serif text-base italic leading-8 text-[#806b5e]">
                {selectedMemory.caption}
              </p>

              <div className="mt-6 text-2xl text-rose-300">♡</div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedMemory(null)}
              className="w-full bg-[#493a32] px-6 py-3 text-sm text-white transition hover:bg-[#6a5146]"
            >
              Close scrapbook
            </button>
          </article>
        </div>
      )}
    </main>
  );
}
