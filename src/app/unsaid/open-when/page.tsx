"use client";

import { useState } from "react";
import Link from "next/link";

const letters = [
  {
    title: "Open when you're sad",
    subtitle: "For the difficult days",
    emoji: "🌧️",
    color: "from-blue-100 to-indigo-100",
    message: `Hey,

I don't know exactly what you're going through right now, but I hope you remember that it's okay not to be okay.

You don't have to figure everything out today. Take a deep breath, give yourself some time, and be a little kinder to yourself.

Bad days don't last forever. I hope tomorrow feels a little lighter. 🤍`,
  },
  {
    title: "Open when you need a smile",
    subtitle: "A little reminder",
    emoji: "🌻",
    color: "from-yellow-100 to-orange-100",
    message: `Hey you!

Here's a tiny reminder that the world is a little brighter with your smile in it.

So, whatever happened today, don't forget to smile. Not because everything is perfect, but because you deserve a moment of happiness.

Sending you a little sunshine! ☀️`,
  },
  {
    title: "Open when you can't sleep",
    subtitle: "For the late-night thoughts",
    emoji: "🌙",
    color: "from-indigo-100 to-purple-100",
    message: `It's late, isn't it?

Maybe your mind is full of thoughts, or maybe sleep just isn't coming.

Whatever it is, let the thoughts rest for a while. Tomorrow is another day, and you don't need to solve everything tonight.

Put your phone down when you're ready, close your eyes, and get some rest.

Good night. ✨`,
  },
  {
    title: "Open when you feel alone",
    subtitle: "A gentle reminder",
    emoji: "🧸",
    color: "from-pink-100 to-rose-100",
    message: `Hey,

Sometimes even when people are around, things can feel a little lonely.

I just want you to know that your feelings matter. You don't always have to pretend to be happy or act like everything is fine.

Take your time. Be yourself. And remember that you deserve kindness, especially from yourself.

Take care. 🤍`,
  },
  {
    title: "Open when you need motivation",
    subtitle: "You've got this",
    emoji: "🌈",
    color: "from-green-100 to-emerald-100",
    message: `A little reminder for you:

You don't have to be perfect. You don't have to have everything figured out.

Just keep moving, even if it's one tiny step at a time.

Your progress doesn't need to look like anyone else's. Trust your pace, believe in your efforts, and don't give up on yourself.

One day at a time. 🌱`,
  },
  {
    title: "Open when you want to know something",
    subtitle: "Something I've never said",
    emoji: "💌",
    color: "from-rose-100 to-pink-100",
    message: `There's something I've wanted to say.

I genuinely enjoy the little moments when we talk. Somehow, even ordinary conversations can become memorable.

I don't know what you think about me, and I don't want to assume anything.

But I do like you. I wanted to be honest about that, without expecting anything in return.

Whatever you feel, I'll respect it. Your comfort and happiness matter. 🤍`,
  },
];

export default function OpenWhenPage() {
  const [selectedLetter, setSelectedLetter] = useState<
    (typeof letters)[number] | null
  >(null);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#100b12] px-5 py-16 text-white sm:px-8">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-rose-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-purple-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl">
        {/* Back link */}
        <Link
          href="/unsaid"
          className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-rose-300"
        >
          <span>←</span> Back to home
        </Link>

        {/* Heading */}
        <header className="mx-auto mb-14 mt-12 max-w-2xl text-center">
          <div className="mb-5 text-5xl">💌</div>

          <p className="mb-3 text-xs uppercase tracking-[0.4em] text-rose-300">
            A little something for you
          </p>

          <h1 className="font-serif text-4xl font-light leading-tight sm:text-6xl">
            Open when...
          </h1>

          <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-white/50 sm:text-base">
            Some little letters for different moments. Pick one whenever you
            feel like reading something.
          </p>
        </header>

        {/* Letter cards */}
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {letters.map((letter, index) => (
            <button
              key={letter.title}
              type="button"
              onClick={() => setSelectedLetter(letter)}
              className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-left transition duration-300 hover:-translate-y-1 hover:border-rose-300/40 hover:bg-white/[0.07]"
            >
              <div
                className={`mb-6 flex h-24 items-center justify-center rounded-xl bg-gradient-to-br ${letter.color}`}
              >
                <span className="text-5xl transition duration-300 group-hover:scale-110">
                  {letter.emoji}
                </span>
              </div>

              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs tracking-widest text-rose-300">
                  LETTER {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-white/30 transition group-hover:translate-x-1 group-hover:text-rose-300">
                  →
                </span>
              </div>

              <h2 className="font-serif text-xl font-medium text-white">
                {letter.title}
              </h2>

              <p className="mt-2 text-sm text-white/40">{letter.subtitle}</p>

              <p className="mt-6 text-xs uppercase tracking-widest text-rose-300/70">
                Tap to open
              </p>
            </button>
          ))}
        </section>

        {/* Footer note */}
        <footer className="mt-20 border-t border-white/10 pt-8 text-center">
          <p className="font-serif text-lg italic text-white/60">
            "A few words, for a few moments."
          </p>
          <p className="mt-3 text-xs tracking-widest text-white/30">
            MADE WITH CARE ♡
          </p>
        </footer>
      </div>

      {/* Letter modal */}
      {selectedLetter && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onClick={() => setSelectedLetter(null)}
          role="presentation"
        >
          <article
            role="dialog"
            aria-modal="true"
            aria-labelledby="letter-title"
            className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-[#fff9f5] p-7 text-[#49333b] shadow-2xl sm:p-10"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedLetter(null)}
              aria-label="Close letter"
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#49333b]/5 text-xl transition hover:bg-[#49333b]/10"
            >
              ×
            </button>

            <div className="mb-6 text-center">
              <span className="text-5xl">{selectedLetter.emoji}</span>

              <p className="mt-5 text-xs uppercase tracking-[0.3em] text-rose-400">
                A letter for you
              </p>

              <h2
                id="letter-title"
                className="mt-3 font-serif text-2xl sm:text-3xl"
              >
                {selectedLetter.title}
              </h2>
            </div>

            <div className="h-px bg-rose-200" />

            <p className="mt-7 whitespace-pre-line font-serif text-base leading-8 text-[#604a51]">
              {selectedLetter.message}
            </p>

            <div className="mt-9 text-right">
              <p className="font-serif italic text-[#a16b7c]">
                Take care of yourself ♡
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSelectedLetter(null)}
              className="mt-8 w-full rounded-full bg-[#49333b] px-6 py-3 text-sm text-white transition hover:bg-[#654653]"
            >
              Close letter
            </button>
          </article>
        </div>
      )}
    </main>
  );
}
