"use client";

import { useState } from "react";
import Link from "next/link";

export default function LovePage() {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noCount, setNoCount] = useState(0);
  const [accepted, setAccepted] = useState(false);

  const moveNoButton = () => {
    const maxX = Math.min(window.innerWidth * 0.3, 140);
    const maxY = 110;

    const x = (Math.random() * 2 - 1) * maxX;
    const y = (Math.random() * 2 - 1) * maxY;

    setNoPosition({ x, y });
    setNoCount((previous) => previous + 1);
  };

  const messages = [
    "Are you sure? 🥺",
    "Think again! 💗",
    "Please reconsider! 🙈",
    "You're making this difficult! 😭",
    "That button is getting shy! 💕",
    "Maybe the answer is YES? 🥹",
  ];

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#160811] px-5 py-12 text-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-[#a51d53]/20 blur-[130px]" />
        <div className="absolute -bottom-40 -right-40 h-[450px] w-[450px] rounded-full bg-[#e45b91]/15 blur-[130px]" />
      </div>

      {/* Floating decoration */}
      <div className="pointer-events-none absolute left-[10%] top-[15%] animate-pulse text-3xl text-[#f5a5bd]/30">
        ♡
      </div>
      <div className="pointer-events-none absolute bottom-[15%] right-[12%] animate-pulse text-4xl text-[#f5a5bd]/30">
        ♥
      </div>

      <div className="relative w-full max-w-[650px]">
        <div className="rounded-[35px] border border-white/10 bg-gradient-to-br from-white/[0.10] to-white/[0.035] px-7 py-16 text-center shadow-[0_25px_80px_rgba(0,0,0,0.3)] backdrop-blur-2xl sm:px-14">
          {!accepted ? (
            <>
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#f8b6cc]/20 bg-[#f8b6cc]/10 px-5 py-2 text-[10px] uppercase tracking-[3px] text-[#ffc1d6]">
                A little question ♡
              </div>

              <div className="mb-8 text-7xl">
                <span className="inline-block animate-[heartbeat_1.5s_infinite]">
                  💗
                </span>
              </div>

              <h1 className="font-serif text-4xl leading-tight sm:text-6xl">
                Do you
                <br />
                <span className="italic text-[#f5afc7]">love me?</span>
              </h1>

              <p className="mx-auto mt-7 max-w-sm text-sm leading-8 text-white/55">
                There's just one little thing I've been wanting to ask you...
              </p>

              <div className="relative mx-auto mt-14 flex min-h-[100px] max-w-[380px] items-center justify-center gap-5">
                {/* YES - stays fixed */}
                <button
                  type="button"
                  onClick={() => setAccepted(true)}
                  className="relative z-20 rounded-full bg-gradient-to-r from-[#f6b4cb] to-[#e995b5] px-10 py-4 text-base font-bold text-[#401426] shadow-[0_10px_35px_rgba(232,126,166,0.25)] transition duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_15px_45px_rgba(232,126,166,0.4)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffc1d6]"
                >
                  Yes 💗
                </button>

                {/* NO - moves away */}
                <button
                  type="button"
                  onMouseEnter={moveNoButton}
                  onTouchStart={moveNoButton}
                  onClick={moveNoButton}
                  style={{
                    transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
                  }}
                  className="relative z-30 rounded-full border border-white/15 bg-white/[0.07] px-10 py-4 text-base font-semibold text-white/75 shadow-lg backdrop-blur-xl transition-transform duration-200 ease-out"
                >
                  No 🙈
                </button>
              </div>

              <div className="mt-9 min-h-[30px] text-sm italic text-[#f5afc7]">
                {noCount > 0
                  ? messages[Math.min(noCount - 1, messages.length - 1)]
                  : "Choose honestly... or try to catch that button 😉"}
              </div>

              <p className="mt-12 text-[10px] tracking-[3px] text-white/25">
                JUST A LITTLE QUESTION · WITH LOVE
              </p>
            </>
          ) : (
            <div className="animate-[fadeIn_0.8s_ease]">
              <div className="mb-8 text-7xl">🥹💗</div>

              <p className="mb-5 text-xs uppercase tracking-[4px] text-[#e9a9c0]">
                My heart is smiling
              </p>

              <h1 className="font-serif text-5xl leading-tight sm:text-6xl">
                You said
                <br />
                <span className="italic text-[#f5afc7]">YES!</span>
              </h1>

              <div className="mx-auto my-9 h-px w-20 bg-[#e7a2bc]/50" />

              <p className="mx-auto max-w-sm text-base leading-9 text-white/70">
                You have no idea how much that made me smile. If this is how you
                really feel, I'd love to make more beautiful memories with you.
                ❤️
              </p>

              <div className="mt-12 text-5xl animate-bounce">💞</div>

              <button
                type="button"
                onClick={() => {
                  setAccepted(false);
                  setNoCount(0);
                  setNoPosition({ x: 0, y: 0 });
                }}
                className="mt-10 rounded-full border border-white/15 px-7 py-3 text-sm text-white/60 transition hover:bg-white/10"
              >
                See again ↻
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 text-center">
          <Link
            href="/for-you"
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
        @keyframes heartbeat {
          0%,
          100% {
            transform: scale(1);
          }
          15% {
            transform: scale(1.15);
          }
          30% {
            transform: scale(1);
          }
          45% {
            transform: scale(1.1);
          }
        }

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
