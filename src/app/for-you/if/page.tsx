"use client";

import { useState } from "react";
import Link from "next/link";

const questions = [
  {
    question: "What if we had a whole day to spend together?",
    subtitle: "No plans, no rush. Just time.",
    options: [
      "A long walk somewhere peaceful",
      "Watching a movie together",
      "Exploring somewhere new",
      "Just talking for hours",
    ],
  },
  {
    question: "What if we could travel anywhere?",
    subtitle: "Just imagine for a moment.",
    options: [
      "A quiet mountain town",
      "A beautiful beach",
      "A city full of lights",
      "Somewhere neither of us has been",
    ],
  },
  {
    question: "What if you could relive one beautiful moment?",
    subtitle: "Some moments deserve a second chance.",
    options: [
      "A moment that made me laugh",
      "A peaceful evening",
      "A special conversation",
      "A moment I never expected",
    ],
  },
  {
    question: "What if someone wanted to know you better?",
    subtitle: "No pressure. Just curiosity.",
    options: [
      "I'd be happy to talk",
      "Let's take it slowly",
      "It depends on the person",
      "I'm not sure yet",
    ],
  },
  {
    question: "What if a beautiful friendship turned into something more?",
    subtitle: "Sometimes life surprises us.",
    options: [
      "That could be beautiful",
      "Only if it feels right",
      "I'd rather keep things as friends",
      "I don't know yet",
    ],
  },
];

export default function IfPage() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [completed, setCompleted] = useState(false);

  const question = questions[current];
  const progress = ((current + 1) / questions.length) * 100;

  const selectAnswer = (answer: string) => {
    setAnswers((previous) => ({
      ...previous,
      [current]: answer,
    }));
  };

  const nextQuestion = () => {
    if (!answers[current]) return;

    if (current === questions.length - 1) {
      setCompleted(true);
    } else {
      setCurrent((previous) => previous + 1);
    }
  };

  const previousQuestion = () => {
    if (current > 0) {
      setCurrent((previous) => previous - 1);
    }
  };

  const restart = () => {
    setCurrent(0);
    setAnswers({});
    setCompleted(false);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#10070d] px-5 py-16 text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-rose-600/10 blur-[120px]" />
        <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-pink-500/10 blur-[120px]" />
      </div>

      {/* Floating decorations */}
      <div className="pointer-events-none fixed inset-0">
        {Array.from({ length: 12 }).map((_, index) => (
          <span
            key={index}
            className="absolute animate-[float_7s_ease-in-out_infinite] text-pink-300/20"
            style={{
              left: `${(index * 41) % 100}%`,
              top: `${(index * 29) % 100}%`,
              animationDelay: `${index * 0.5}s`,
            }}
          >
            {index % 2 === 0 ? "♡" : "✦"}
          </span>
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-xl">
        {!completed ? (
          <div className="rounded-3xl border border-pink-300/15 bg-white/[0.04] p-6 shadow-2xl shadow-rose-950/30 backdrop-blur-xl sm:p-10">
            {/* Header */}
            <div className="mb-9 text-center">
              <div className="mb-5 inline-flex rounded-full border border-pink-300/20 bg-pink-300/5 px-4 py-2 text-xs tracking-[0.25em] text-pink-200">
                A LITTLE GAME OF IMAGINATION
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl">
                What <span className="italic text-pink-300">If...?</span>
              </h1>

              <p className="mt-4 text-sm text-white/45">
                A few little questions. Answer however you feel.
              </p>
            </div>

            {/* Progress */}
            <div className="mb-10">
              <div className="mb-3 flex justify-between text-xs text-white/40">
                <span>
                  QUESTION {current + 1} OF {questions.length}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>

              <div className="h-1 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-rose-500 to-pink-300 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div key={current} className="animate-[fadeIn_0.4s_ease-out]">
              <p className="mb-3 text-xs tracking-[0.25em] text-pink-300/60">
                QUESTION {String(current + 1).padStart(2, "0")}
              </p>

              <h2 className="font-serif text-2xl leading-snug sm:text-3xl">
                {question.question}
              </h2>

              <p className="mt-3 text-sm text-white/40">{question.subtitle}</p>

              {/* Options */}
              <div className="mt-8 space-y-3">
                {question.options.map((option, index) => {
                  const selected = answers[current] === option;

                  return (
                    <button
                      key={option}
                      onClick={() => selectAnswer(option)}
                      className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left text-sm transition-all duration-300 ${
                        selected
                          ? "border-pink-300/50 bg-pink-300/10 text-pink-100"
                          : "border-white/10 bg-white/[0.02] text-white/65 hover:border-pink-300/30 hover:bg-white/[0.05]"
                      }`}
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs ${
                          selected
                            ? "border-pink-300 bg-pink-300 text-[#190b13]"
                            : "border-white/20 text-white/40"
                        }`}
                      >
                        {selected ? "✓" : String.fromCharCode(65 + index)}
                      </span>

                      {option}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-10 flex items-center justify-between gap-4">
              <button
                onClick={previousQuestion}
                disabled={current === 0}
                className="rounded-full border border-white/10 px-6 py-3 text-sm text-white/60 transition hover:border-white/30 disabled:cursor-not-allowed disabled:opacity-20"
              >
                ← Back
              </button>

              <button
                onClick={nextQuestion}
                disabled={!answers[current]}
                className="rounded-full bg-gradient-to-r from-rose-500 to-pink-400 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-30"
              >
                {current === questions.length - 1 ? "Finish ♡" : "Continue →"}
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-[fadeIn_0.7s_ease-out] rounded-3xl border border-pink-300/20 bg-white/[0.04] p-8 text-center shadow-2xl backdrop-blur-xl sm:p-12">
            <div className="text-5xl text-pink-300">♡</div>

            <h2 className="mt-7 font-serif text-4xl italic text-pink-100">
              Thank you for answering!
            </h2>

            <p className="mx-auto mt-5 max-w-sm text-sm leading-7 text-white/55">
              Every answer tells a little story. I hope these questions gave you
              a moment to smile and imagine.
            </p>

            {/* Answer summary */}
            <div className="mt-9 space-y-3 text-left">
              {questions.map((item, index) => (
                <div
                  key={item.question}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <p className="text-xs text-pink-300/70">
                    QUESTION {index + 1}
                  </p>

                  <p className="mt-2 text-sm text-white/60">{item.question}</p>

                  <p className="mt-2 text-sm font-medium text-pink-100">
                    {answers[index]}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={restart}
              className="mt-9 rounded-full border border-pink-300/25 px-7 py-3 text-sm text-pink-200 transition hover:bg-pink-300/10"
            >
              Answer again ↻
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="mt-10 text-center">
          <Link
            href="/for-you"
            className="text-sm text-white/40 transition hover:text-pink-200"
          >
            ← Back to the beginning
          </Link>
        </div>

        <p className="mt-6 text-center text-[10px] tracking-[0.2em] text-white/20">
          NO WRONG ANSWERS · JUST YOUR THOUGHTS
        </p>
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

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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
