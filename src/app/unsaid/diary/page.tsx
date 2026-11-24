"use client";

import { useState } from "react";
import Link from "next/link";

const entries = [
  {
    date: "01",
    month: "A THOUGHT",
    title: "An Unexpected Thought",
    preview: "Some people appear in your thoughts without even trying...",
    content: `Dear Diary,

It's strange how some people can become a part of your thoughts without doing anything extraordinary.

Sometimes it's just a simple conversation, a familiar face, or a little moment that stays with you longer than expected.

I don't know why certain moments feel different.

Maybe some things don't need an explanation.

Just a thought worth writing down. ♡`,
  },
  {
    date: "02",
    month: "A LITTLE MOMENT",
    title: "The Little Things",
    preview: "Not every meaningful moment has to be extraordinary...",
    content: `Dear Diary,

I've started noticing that the little things can mean a lot.

A smile, a few words, a familiar presence, or even an ordinary day that somehow feels a little different.

Maybe happiness isn't always about big events.

Sometimes it hides in the smallest moments.

And perhaps that's what makes those moments worth remembering. ♡`,
  },
  {
    date: "03",
    month: "SOMEWHERE IN MY MIND",
    title: "Things Left Unsaid",
    preview: "There are thoughts that are easier to write than to say...",
    content: `Dear Diary,

There are things I sometimes want to say but don't quite know how to express.

Not because they're complicated, but because words can change the way people see things.

So I keep some thoughts here, between these pages.

No expectations. No assumptions.

Just honesty, quietly written down. ♡`,
  },
  {
    date: "04",
    month: "A QUIET REALIZATION",
    title: "Taking Things Slowly",
    preview: "Not everything needs an immediate answer...",
    content: `Dear Diary,

I've realized that not everything needs to happen the way we imagine.

People have their own feelings, priorities, and journeys.

It's important to appreciate someone without expecting them to feel the same way.

Some connections are best understood with patience.

And sometimes, respecting someone's space is also a way of caring. ♡`,
  },
  {
    date: "05",
    month: "A FINAL NOTE",
    title: "Just Being Honest",
    preview: "Perhaps honesty is enough, even without an answer...",
    content: `Dear Diary,

If there's one thing I want to remember, it's this:

Being honest about how I feel doesn't mean someone owes me the same feelings in return.

I can appreciate someone, wish them happiness, and still respect whatever they choose.

Not every story needs a particular ending.

For now, I'm simply glad I had something beautiful to write about.

Until the next page. ♡`,
  },
];

export default function DiaryPage() {
  const [selectedEntry, setSelectedEntry] = useState<
    (typeof entries)[number] | null
  >(null);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#10070d] px-5 py-16 text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-rose-600/10 blur-[120px]" />
        <div className="absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-pink-500/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        {/* Header */}
        <header className="mb-16 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-pink-300/20 bg-pink-300/5 px-4 py-2 text-xs tracking-[0.25em] text-pink-200">
            <span>✧</span>
            PRIVATE THOUGHTS & LITTLE MOMENTS
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl">
            Dear <span className="italic text-pink-300">Diary...</span>
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-white/50 sm:text-base">
            A few pages filled with thoughts, little observations, and words
            that sometimes remain unspoken.
          </p>

          <div className="mt-8 text-3xl text-pink-300/80">✦ ♡ ✦</div>
        </header>

        {/* Diary notebook */}
        <section className="mx-auto max-w-3xl rounded-2xl border border-[#d6bda7]/20 bg-[#e9d9c8] p-3 shadow-2xl shadow-black/40 sm:p-5">
          <div className="relative overflow-hidden rounded-xl border border-[#b99b83]/30 bg-[#f5eadd] px-5 py-9 text-[#59413d] sm:px-10">
            {/* Paper decoration */}
            <div className="pointer-events-none absolute bottom-0 left-12 top-0 w-px bg-rose-300/40" />

            <div className="relative pl-7">
              <div className="mb-10 flex items-center justify-between border-b border-[#b99b83]/30 pb-5">
                <div>
                  <p className="font-serif text-2xl italic">
                    My little journal
                  </p>
                  <p className="mt-1 text-[9px] tracking-[0.25em] text-[#a17d72]">
                    THOUGHTS · FEELINGS · MEMORIES
                  </p>
                </div>
                <span className="text-3xl text-[#bd8298]">♡</span>
              </div>

              <div className="space-y-0">
                {entries.map((entry, index) => (
                  <button
                    key={entry.date}
                    onClick={() => setSelectedEntry(entry)}
                    className="group w-full border-b border-dashed border-[#b99b83]/40 py-6 text-left transition hover:bg-[#e9d9c8]/40"
                  >
                    <div className="flex items-start gap-5">
                      <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-full border border-[#bd8298]/40 text-[#a77b8b]">
                        <span className="font-serif text-xl">{entry.date}</span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-[9px] tracking-[0.25em] text-[#a77b8b]">
                          {entry.month}
                        </p>

                        <h2 className="mt-2 font-serif text-xl italic transition group-hover:text-[#a45e7a] sm:text-2xl">
                          {entry.title}
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-[#8b7168]">
                          {entry.preview}
                        </p>

                        <p className="mt-4 text-xs text-[#b17b8c]">
                          Read this page →
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="pt-8 text-right">
                <p className="font-serif text-sm italic text-[#a77b8b]">
                  More thoughts, another day...
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Closing message */}
        <section className="mx-auto mt-16 max-w-xl text-center">
          <p className="font-serif text-2xl italic leading-relaxed text-white/70">
            "Some words are written not to be heard, but simply to be
            remembered."
          </p>

          <p className="mt-5 text-xs tracking-[0.3em] text-pink-300/60">
            END OF THIS LITTLE CHAPTER ♡
          </p>
        </section>

        {/* Footer */}
        <footer className="mt-16 text-center">
          <Link
            href="/for-you"
            className="inline-flex rounded-full border border-pink-300/20 px-7 py-3 text-sm text-pink-200 transition hover:border-pink-300/50 hover:bg-pink-300/10"
          >
            ← Back to the beginning
          </Link>
        </footer>
      </div>

      {/* Diary entry modal */}
      {selectedEntry && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-5 backdrop-blur-md"
          onClick={() => setSelectedEntry(null)}
        >
          <article
            className="relative my-auto w-full max-w-xl animate-[pageOpen_0.45s_ease-out] rounded-sm bg-[#f5eadd] px-7 py-12 text-[#59413d] shadow-2xl sm:px-12"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={() => setSelectedEntry(null)}
              aria-label="Close diary entry"
              className="absolute right-5 top-4 text-2xl text-[#a77b8b] hover:text-[#59413d]"
            >
              ×
            </button>

            <div className="mb-8 flex items-center justify-between border-b border-[#b99b83]/30 pb-5">
              <span className="text-[10px] tracking-[0.25em] text-[#a77b8b]">
                DIARY ENTRY {selectedEntry.date}
              </span>
              <span className="text-2xl text-[#bd8298]">♡</span>
            </div>

            <h2 className="font-serif text-3xl italic sm:text-4xl">
              {selectedEntry.title}
            </h2>

            <div className="my-7 h-px w-16 bg-[#bd8298]/50" />

            <p className="whitespace-pre-line font-serif text-base leading-8 text-[#715951]">
              {selectedEntry.content}
            </p>

            <div className="mt-10 border-t border-[#b99b83]/30 pt-5 text-right">
              <span className="font-serif text-sm italic text-[#a77b8b]">
                Until next time... ♡
              </span>
            </div>
          </article>
        </div>
      )}

      <style jsx global>{`
        @keyframes pageOpen {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.97);
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
