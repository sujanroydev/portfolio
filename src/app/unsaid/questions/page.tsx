"use client";

import { useState } from "react";
import Link from "next/link";
import { trackActivity, trackResponse } from "@/lib/unsaid/track-activity";

const questions = [
  {
    emoji: "🌸",
    question: "How would you describe me?",
    subtitle: "I'm curious to know what you think.",
    options: [
      "A little weird, but nice",
      "Someone easy to talk to",
      "A quiet and thoughtful person",
      "Still figuring that out ♡",
    ],
  },
  {
    emoji: "💭",
    question: "Do you enjoy talking to me?",
    subtitle: "Be honest. No wrong answers.",
    options: [
      "Of course!",
      "Sometimes, yes",
      "I don't mind",
      "We should talk more",
    ],
  },
  {
    emoji: "✨",
    question: "What's your idea of a perfect day?",
    subtitle: "A little glimpse into your world.",
    options: [
      "A peaceful day at home",
      "Going somewhere beautiful",
      "Spending time with friends",
      "Something completely unexpected",
    ],
  },
  {
    emoji: "🌙",
    question: "Do you believe in unexpected connections?",
    subtitle: "Sometimes the little things matter.",
    options: [
      "Yes, absolutely",
      "Maybe...",
      "Not really",
      "I haven't thought about it",
    ],
  },
  {
    emoji: "💗",
    question: "Would you like to know me better?",
    subtitle: "Take your time. There's no pressure.",
    options: [
      "I'd love that!",
      "Maybe, let's see",
      "As friends, sure",
      "I'm not sure yet",
    ],
  },
];

export default function QuestionsPage() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);

  const question = questions[current];
  const selected = answers[current];
  const progress = (current / questions.length) * 100;

  function selectAnswer(index: number) {
    setAnswers((previous) => {
      const updated = [...previous];
      updated[current] = index;
      return updated;
    });
    void trackActivity("questions", "Answer option selected", { questionId: `question-${current + 1}`, question: questions[current].question, option: questions[current].options[index], optionIndex: index }, "option_selected");
    void trackResponse("questions", `question-${current + 1}`, questions[current].question, questions[current].options[index]);
  }

  async function nextQuestion() {
    if (selected === undefined) return;

    if (current === questions.length - 1) {
      setCompleted(true);
      const activity = await trackActivity("questions", "Questions activity completed", { answerCount: answers.length }, "activity_completed");
      const activityId = activity?.activity?.id;
      for (let index = 0; index < questions.length; index += 1) {
        const optionIndex = answers[index];
        if (optionIndex === undefined) continue;
        void trackResponse("questions", `question-${index + 1}`, questions[index].question, questions[index].options[optionIndex], activityId);
      }
    } else {
      setCurrent((previous) => previous + 1);
    }
  }

  function previousQuestion() {
    if (current > 0) {
      setCurrent((previous) => previous - 1);
    }
  }

  function restart() {
    setStarted(false);
    setCurrent(0);
    setAnswers([]);
    setCompleted(false);
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#160811] px-5 py-12 text-white selection:bg-[#f5a5bd] selection:text-[#260c19]">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-[#a51d53]/20 blur-[130px]" />
        <div className="absolute -bottom-40 -right-40 h-[450px] w-[450px] rounded-full bg-[#e45b91]/15 blur-[130px]" />
      </div>

      {/* Main card */}
      <div className="relative w-full max-w-[650px]">
        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-white/[0.10] to-white/[0.035] p-7 shadow-[0_25px_80px_rgba(0,0,0,0.3)] backdrop-blur-2xl sm:p-12">
          {/* Header */}
          <div className="mb-10 text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#f8b6cc]/20 bg-[#f8b6cc]/10 px-5 py-2 text-[10px] font-medium uppercase tracking-[3px] text-[#ffc1d6]">
              <span>♡</span>A little conversation
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl">
              A Few Questions
              <span className="block mt-2 italic text-[#f5afc7]">For You.</span>
            </h1>

            <p className="mt-5 text-sm leading-7 text-white/50">
              Just a few little questions. Answer however you feel.
            </p>
          </div>

          {/* Welcome screen */}
          {!started && !completed && (
            <div className="animate-[fadeIn_0.6s_ease] text-center">
              <div className="mb-8 text-7xl">💌</div>

              <h2 className="font-serif text-2xl text-[#ffd0df]">
                Before we begin...
              </h2>

              <p className="mx-auto mt-5 max-w-sm text-sm leading-8 text-white/60">
                I have a few things I'd love to ask you. Nothing serious,
                nothing complicated. Just a little conversation, from me to you.
              </p>

              <button
                onClick={() => setStarted(true)}
                className="mt-10 rounded-full bg-gradient-to-r from-[#f6b4cb] to-[#e995b5] px-9 py-4 text-sm font-semibold text-[#401426] shadow-lg shadow-[#e995b5]/20 transition hover:-translate-y-1 hover:shadow-xl"
              >
                Let's Begin ♡
              </button>
            </div>
          )}

          {/* Questions */}
          {started && !completed && (
            <div key={current} className="animate-[fadeIn_0.4s_ease]">
              {/* Progress */}
              <div className="mb-9">
                <div className="mb-3 flex justify-between text-xs text-white/45">
                  <span>
                    QUESTION {current + 1} OF {questions.length}
                  </span>
                  <span>
                    {Math.round(((current + 1) / questions.length) * 100)}%
                  </span>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#d75b91] to-[#ffc0d5] transition-all duration-500"
                    style={{
                      width: `${((current + 1) / questions.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="mb-9 text-center">
                <div className="mb-6 text-5xl">{question.emoji}</div>

                <h2 className="font-serif text-2xl leading-snug sm:text-3xl">
                  {question.question}
                </h2>

                <p className="mt-4 text-sm text-white/45">
                  {question.subtitle}
                </p>
              </div>

              {/* Answer options */}
              <div className="space-y-3">
                {question.options.map((option, index) => {
                  const isSelected = selected === index;

                  return (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => selectAnswer(index)}
                      className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left text-sm transition-all duration-300 sm:p-5 ${
                        isSelected
                          ? "border-[#f2a9c4]/60 bg-[#e995b5]/15 text-[#ffd0df] shadow-[0_0_25px_rgba(233,149,181,0.08)]"
                          : "border-white/[0.08] bg-white/[0.035] text-white/65 hover:border-[#f2a9c4]/30 hover:bg-white/[0.07]"
                      }`}
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs transition ${
                          isSelected
                            ? "border-[#f5b4cc] bg-[#f5b4cc] text-[#401426]"
                            : "border-white/20 text-white/40"
                        }`}
                      >
                        {isSelected ? "✓" : String.fromCharCode(65 + index)}
                      </span>

                      <span className="flex-1">{option}</span>

                      {isSelected && <span className="text-[#f5b4cc]">♡</span>}
                    </button>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="mt-10 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={previousQuestion}
                  disabled={current === 0}
                  className="rounded-full border border-white/10 px-6 py-3 text-sm text-white/55 transition hover:bg-white/5 disabled:invisible"
                >
                  ← Back
                </button>

                <button
                  type="button"
                  onClick={nextQuestion}
                  disabled={selected === undefined}
                  className="rounded-full bg-gradient-to-r from-[#f6b4cb] to-[#e995b5] px-7 py-3 text-sm font-semibold text-[#401426] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  {current === questions.length - 1 ? "Finish ♡" : "Continue →"}
                </button>
              </div>
            </div>
          )}

          {/* Completion */}
          {completed && (
            <div className="animate-[fadeIn_0.6s_ease] text-center">
              <div className="mb-8 text-7xl">💗</div>

              <h2 className="font-serif text-4xl text-[#ffd0df]">Thank You!</h2>

              <p className="mx-auto mt-6 max-w-sm text-sm leading-8 text-white/60">
                Thank you for taking a little time to answer my questions. I
                hope this made you smile.
              </p>

              <div className="my-9 rounded-2xl border border-[#f2a9c4]/15 bg-[#e995b5]/[0.07] p-6">
                <p className="font-serif text-xl italic text-[#f5afc7]">
                  "It's the little things that make a moment special."
                </p>
              </div>

              <button
                type="button"
                onClick={restart}
                className="rounded-full border border-white/15 px-7 py-3 text-sm text-white/65 transition hover:bg-white/10"
              >
                Start Again ↻
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 flex flex-col items-center gap-4 text-center">
          <Link
            href="/unsaid"
            className="text-xs text-white/40 transition hover:text-[#f5afc7]"
          >
            ← Back to your little surprise
          </Link>

          <p className="text-[10px] tracking-[3px] text-white/20">
            MADE WITH LOVE ♡
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
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
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </main>
  );
}
