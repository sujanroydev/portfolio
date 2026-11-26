"use client";

import { useState } from "react";
import Link from "next/link";
import { trackActivity, trackResponse } from "@/lib/unsaid/track-activity";

const questions = [
  {
    category: "THE LITTLE THINGS",
    left: { label: "Sunrise", emoji: "🌅" },
    right: { label: "Sunset", emoji: "🌇" },
  },
  {
    category: "FOOD MOOD",
    left: { label: "Pizza", emoji: "🍕" },
    right: { label: "Momos", emoji: "🥟" },
  },
  {
    category: "PERFECT EVENING",
    left: { label: "Rainy day", emoji: "🌧️" },
    right: { label: "Starry night", emoji: "🌌" },
  },
  {
    category: "ENTERTAINMENT",
    left: { label: "Movies", emoji: "🎬" },
    right: { label: "Music", emoji: "🎧" },
  },
  {
    category: "TRAVEL",
    left: { label: "Mountains", emoji: "🏔️" },
    right: { label: "Beach", emoji: "🏖️" },
  },
  {
    category: "YOUR VIBE",
    left: { label: "Quiet moments", emoji: "🌷" },
    right: { label: "Crazy adventures", emoji: "🎢" },
  },
  {
    category: "SWEET TOOTH",
    left: { label: "Chocolate", emoji: "🍫" },
    right: { label: "Ice cream", emoji: "🍦" },
  },
  {
    category: "COMMUNICATION",
    left: { label: "Texting", emoji: "💬" },
    right: { label: "Calling", emoji: "📞" },
  },
  {
    category: "FREE TIME",
    left: { label: "Stay at home", emoji: "🏡" },
    right: { label: "Go outside", emoji: "🚶" },
  },
  {
    category: "ONE LAST THING",
    left: { label: "A handwritten letter", emoji: "💌" },
    right: { label: "A surprise gift", emoji: "🎁" },
  },
];

type Answer = "left" | "right";

export default function ThisOrThatPage() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [finished, setFinished] = useState(false);

  const question = questions[current];

  function chooseAnswer(answer: Answer) {
    setAnswers((previous) => [...previous, answer]);
    const choice = answer === "left" ? question.left : question.right;
    void trackActivity("this-or-that", "This-or-that choice selected", { questionId: `choice-${current + 1}`, category: question.category, choice: choice.label, side: answer }, "option_selected");
    void trackResponse("this-or-that", `choice-${current + 1}`, question.category, { choice: choice.label, side: answer });

    if (current === questions.length - 1) {
      setFinished(true);
      void trackActivity("this-or-that", "This-or-that activity completed", { answerCount: answers.length + 1 }, "activity_completed");
    } else {
      setCurrent((previous) => previous + 1);
    }
  }

  function goBack() {
    if (current === 0 || finished) return;

    setAnswers((previous) => previous.slice(0, -1));
    setCurrent((previous) => previous - 1);
  }

  function restart() {
    setCurrent(0);
    setAnswers([]);
    setFinished(false);
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#100b12] px-5 py-12 text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-rose-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-purple-500/10 blur-[120px]" />

      <div className="relative w-full max-w-2xl">
        <Link
          href="/unsaid"
          className="mb-10 inline-flex items-center gap-2 text-sm text-white/45 transition hover:text-rose-300"
        >
          ← Back to home
        </Link>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-2xl backdrop-blur-xl sm:p-10">
          {!finished ? (
            <>
              {/* Heading */}
              <header className="mb-9 text-center">
                <div className="mb-5 text-5xl">⚖️</div>

                <p className="text-xs tracking-[0.4em] text-rose-300">
                  A LITTLE GAME
                </p>

                <h1 className="mt-3 font-serif text-4xl font-light sm:text-5xl">
                  This or That?
                </h1>

                <p className="mt-3 text-sm text-white/45">
                  No right answers. Just choose what feels more like you.
                </p>
              </header>

              {/* Progress */}
              <div className="mb-9">
                <div className="mb-3 flex items-center justify-between text-xs text-white/40">
                  <span>
                    QUESTION {current + 1} OF {questions.length}
                  </span>
                  <span>
                    {Math.round(((current + 1) / questions.length) * 100)}%
                  </span>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-rose-300 transition-all duration-500"
                    style={{
                      width: `${((current + 1) / questions.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="mb-8 text-center">
                <p className="text-xs tracking-[0.3em] text-rose-300/80">
                  {question.category}
                </p>

                <h2 className="mt-3 font-serif text-2xl sm:text-3xl">
                  Which one would you choose?
                </h2>
              </div>

              {/* Choices */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => chooseAnswer("left")}
                  className="group flex min-h-48 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition duration-300 hover:-translate-y-1 hover:border-rose-300/60 hover:bg-rose-300/10"
                >
                  <span className="text-5xl transition duration-300 group-hover:scale-110">
                    {question.left.emoji}
                  </span>

                  <span className="mt-5 text-center font-serif text-lg sm:text-xl">
                    {question.left.label}
                  </span>

                  <span className="mt-3 text-[10px] tracking-widest text-white/30 group-hover:text-rose-300">
                    CHOOSE THIS
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => chooseAnswer("right")}
                  className="group flex min-h-48 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition duration-300 hover:-translate-y-1 hover:border-rose-300/60 hover:bg-rose-300/10"
                >
                  <span className="text-5xl transition duration-300 group-hover:scale-110">
                    {question.right.emoji}
                  </span>

                  <span className="mt-5 text-center font-serif text-lg sm:text-xl">
                    {question.right.label}
                  </span>

                  <span className="mt-3 text-[10px] tracking-widest text-white/30 group-hover:text-rose-300">
                    CHOOSE THIS
                  </span>
                </button>
              </div>

              {/* Navigation */}
              <div className="mt-8 flex items-center justify-between">
                <button
                  type="button"
                  onClick={goBack}
                  disabled={current === 0}
                  className="text-sm text-white/40 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-20"
                >
                  ← Previous
                </button>

                <p className="text-xs text-white/30">
                  Your choices stay on this page.
                </p>
              </div>
            </>
          ) : (
            /* Completion screen */
            <div className="py-5 text-center">
              <div className="mb-6 text-6xl">💗</div>

              <p className="text-xs tracking-[0.4em] text-rose-300">ALL DONE</p>

              <h1 className="mt-4 font-serif text-4xl font-light sm:text-5xl">
                That was fun!
              </h1>

              <p className="mx-auto mt-5 max-w-sm text-sm leading-7 text-white/50">
                Thanks for playing. Every little choice tells a tiny story about
                what you like.
              </p>

              <div className="mt-9 rounded-2xl border border-white/10 bg-black/20 p-5 text-left">
                <h2 className="mb-5 text-center text-xs tracking-[0.3em] text-rose-300">
                  YOUR PICKS
                </h2>

                <div className="space-y-4">
                  {questions.map((item, index) => {
                    const answer = answers[index];
                    const choice = answer === "left" ? item.left : item.right;

                    return (
                      <div
                        key={item.category}
                        className="flex items-center justify-between gap-3 border-b border-white/5 pb-3 last:border-0 last:pb-0"
                      >
                        <span className="text-sm text-white/40">
                          {item.category}
                        </span>

                        <span className="text-right text-sm text-white/85">
                          {choice.emoji} {choice.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <p className="mt-8 font-serif text-lg italic text-rose-300">
                "It's the little things that make you, you." ♡
              </p>

              <button
                type="button"
                onClick={restart}
                className="mt-8 rounded-full bg-rose-300 px-8 py-3 text-sm font-medium text-[#24131c] transition hover:bg-rose-200"
              >
                Play again ↻
              </button>
            </div>
          )}
        </div>

        <p className="mt-7 text-center text-xs tracking-[0.25em] text-white/25">
          JUST FOR FUN ♡
        </p>
      </div>
    </main>
  );
}
