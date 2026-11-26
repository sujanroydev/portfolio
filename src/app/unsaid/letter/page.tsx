"use client";

import { useState } from "react";
import Link from "next/link";
import { trackActivity } from "@/lib/unsaid/track-activity";

export default function LetterPage() {
  const [opened, setOpened] = useState(false);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#160811] px-5 py-16 text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-[#a51d53]/20 blur-[130px]" />
        <div className="absolute -bottom-40 -right-40 h-[450px] w-[450px] rounded-full bg-[#e45b91]/15 blur-[130px]" />
        <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8d244f]/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[700px]">
        {/* Heading */}
        <div className="mb-12 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#f8b6cc]/20 bg-[#f8b6cc]/10 px-5 py-2 text-[10px] uppercase tracking-[3px] text-[#ffc1d6]">
            <span>♡</span>A letter from my heart
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl">
            Words I couldn't
            <br />
            <span className="italic text-[#f5afc7]">say out loud.</span>
          </h1>

          <p className="mt-5 text-sm text-white/45">
            There's something I wanted you to read...
          </p>
        </div>

        {!opened ? (
          /* SEALED ENVELOPE */
          <div className="animate-[fadeIn_0.8s_ease] text-center">
            <button
              type="button"
              onClick={() => {
                setOpened(true);
                void trackActivity("letter", "Letter opened", { letter: "Words I couldn't say out loud" }, "item_revealed");
              }}
              aria-label="Open your letter"
              className="group mx-auto block w-full max-w-[440px] text-center focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#ffc1d6]"
            >
              <div className="relative mx-auto aspect-[1.4/1] w-full overflow-hidden rounded-[24px] border border-[#f5b5cb]/30 bg-gradient-to-br from-[#8e294e] via-[#68203e] to-[#42172e] shadow-[0_30px_90px_rgba(0,0,0,0.45)] transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-[0_35px_100px_rgba(224,100,147,0.2)]">
                {/* Envelope flaps */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#b64b70]/40 to-transparent" />

                <div className="absolute left-0 top-0 h-0 w-0 border-l-[220px] border-r-[220px] border-t-[145px] border-l-transparent border-r-transparent border-t-[#c36a89]/40 sm:border-l-[220px] sm:border-r-[220px]" />

                <div className="absolute bottom-0 left-0 h-0 w-0 border-b-[180px] border-l-[220px] border-r-[220px] border-b-[#54172f] border-l-transparent border-r-transparent" />

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full border border-[#ffc1d6]/30 bg-[#e99bb8] text-3xl text-[#641d3b] shadow-[0_5px_25px_rgba(0,0,0,0.2)] transition duration-500 group-hover:scale-110 group-hover:rotate-12">
                    ♥
                  </div>

                  <p className="relative z-10 font-serif text-xl italic text-[#ffe0e9]">
                    For You
                  </p>
                </div>
              </div>

              <p className="mt-9 text-xs uppercase tracking-[4px] text-[#e9a9c0] transition group-hover:text-[#ffd0df]">
                Tap the envelope to open ♡
              </p>
            </button>
          </div>
        ) : (
          /* OPEN LETTER */
          <div className="animate-[letterReveal_1s_ease]">
            <div className="relative overflow-hidden rounded-[5px] bg-[#f8e9e2] px-7 py-12 text-[#512b38] shadow-[0_30px_100px_rgba(0,0,0,0.5)] sm:px-14 sm:py-16">
              {/* Paper decoration */}
              <div className="pointer-events-none absolute inset-3 border border-[#d8b6b2]/40" />

              <div className="relative">
                <div className="mb-10 flex items-center justify-between">
                  <span className="font-serif text-sm italic text-[#a46c7b]">
                    A little note...
                  </span>
                  <span className="text-2xl text-[#c47c96]">♡</span>
                </div>

                <h2 className="mb-10 font-serif text-4xl italic text-[#813b57] sm:text-5xl">
                  Dear Her Name,
                </h2>

                <div className="space-y-6 font-serif text-[16px] leading-[2] text-[#684450] sm:text-lg">
                  <p>
                    I don't really know where to begin, but I guess the simplest
                    way is to be honest.
                  </p>

                  <p>
                    Somewhere along the way, you became someone I look forward
                    to seeing. Maybe you don't even realize it, but your smile,
                    your presence and the little things about you have made a
                    place in my thoughts.
                  </p>

                  <p>
                    I know we may not talk as much as I'd like, and perhaps you
                    see me differently. That's okay. I don't want this letter to
                    make you feel uncomfortable or obligated to say anything.
                  </p>

                  <p>
                    I just wanted you to know that there's someone who genuinely
                    appreciates you and thinks you're a pretty special person.
                  </p>

                  <p>
                    Whatever you feel, I respect that. I would rather be honest
                    than keep these feelings completely to myself.
                  </p>
                </div>

                <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-[#c78c9e]/60 to-transparent" />

                <div className="text-right">
                  <p className="mb-3 font-serif text-base italic text-[#986273]">
                    With warmth and a little courage,
                  </p>

                  <p className="font-serif text-2xl italic text-[#813b57]">
                    Someone who likes you ♡
                  </p>
                </div>

                <div className="mt-12 text-center text-2xl text-[#c47c96]">
                  ✧ ♡ ✧
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setOpened(false)}
                className="rounded-full border border-white/15 px-7 py-3 text-xs text-white/55 transition hover:bg-white/10 hover:text-white"
              >
                Close the letter ↺
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 flex flex-col items-center gap-5 text-center">
          <Link
            href="/unsaid"
            className="text-xs text-white/40 transition hover:text-[#f5afc7]"
          >
            ← Back to your little surprise
          </Link>

          <p className="text-[10px] tracking-[3px] text-white/20">
            WRITTEN WITH LOVE ♡
          </p>
        </div>
      </div>

      <style jsx global>{`
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

        @keyframes letterReveal {
          from {
            opacity: 0;
            transform: translateY(35px) scale(0.96);
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
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </main>
  );
}
