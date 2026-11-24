"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface FloatingHeart {
  id: number;
  left: string;
  size: string;
  duration: number;
  delay: number;
  emoji: string;
  expiresAt: number;
}

const reasons = [
  {
    icon: "✨",
    title: "Your beautiful smile",
    description:
      "You have a way of making an ordinary day feel a little brighter.",
  },
  {
    icon: "🌸",
    title: "The little things",
    description: "I love all those little things that make you uniquely you.",
  },
  {
    icon: "💗",
    title: "The way you make me feel",
    description: "Somehow, just thinking about you brings a smile to my face.",
  },
  {
    icon: "🌙",
    title: "Something different",
    description:
      "Being around you feels special in a way I cannot quite explain.",
  },
];

export default function ForYouPage() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [messageVisible, setMessageVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const heartId = useRef(0);
  const storyRef = useRef<HTMLElement | null>(null);
  const messageRef = useRef<HTMLDivElement | null>(null);

  const createHeart = useCallback((delay = 0): FloatingHeart => {
    const duration = Math.random() * 5 + 8;

    return {
      id: heartId.current++,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 17 + 12}px`,
      duration,
      delay,
      emoji: Math.random() > 0.5 ? "♡" : "♥",
      expiresAt: Date.now() + duration * 1000 + delay,
    };
  }, []);

  // Floating hearts
  useEffect(() => {
    const timer = window.setInterval(() => {
      const now = Date.now();

      setHearts((current) => [
        ...current.filter((heart) => heart.expiresAt > now).slice(-24),
        createHeart(),
      ]);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [createHeart]);

  // Scroll progress
  useEffect(() => {
    const updateProgress = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;

      setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    };

    updateProgress();

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  // Scroll to revealed confession
  useEffect(() => {
    if (messageVisible) {
      const timer = window.setTimeout(() => {
        messageRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 150);

      return () => window.clearTimeout(timer);
    }
  }, [messageVisible]);

  const revealMessage = () => {
    setMessageVisible(true);

    const now = Date.now();

    setHearts((current) => [
      ...current.filter((heart) => heart.expiresAt > now).slice(-15),
      ...Array.from({ length: 30 }, (_, index) => createHeart(index * 65)),
    ]);
  };

  const scrollToStory = () => {
    storyRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#160811] font-sans text-white selection:bg-[#f5a5bd] selection:text-[#260c19]">
      {/* Animation styles */}
      <style jsx global>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.65;
          }
          90% {
            opacity: 0.35;
          }
          100% {
            transform: translateY(-115vh) rotate(35deg);
            opacity: 0;
          }
        }

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

        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes glow {
          0%,
          100% {
            opacity: 0.35;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes reveal {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .float-heart {
          animation-name: float-up;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
        }

        .fade-up {
          animation: fade-up 1s ease-out both;
        }

        .heart-beat {
          animation: heartbeat 1.6s ease-in-out infinite;
        }

        .reveal {
          animation: reveal 0.8s ease-out both;
        }

        .glass-card {
          background: linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.105),
            rgba(255, 255, 255, 0.035)
          );
          border: 1px solid rgba(255, 255, 255, 0.13);
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }

        html {
          scroll-behavior: smooth;
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* Background */}
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#a51d53]/20 blur-[130px]" />
        <div className="absolute -right-40 top-[35%] h-[450px] w-[450px] rounded-full bg-[#e45b91]/15 blur-[130px]" />
        <div className="absolute -bottom-40 left-[20%] h-[450px] w-[450px] rounded-full bg-[#76204a]/20 blur-[130px]" />

        {hearts.map((heart) => (
          <span
            key={heart.id}
            className="float-heart absolute bottom-[-40px] select-none text-[#ff9fbd]"
            style={{
              left: heart.left,
              fontSize: heart.size,
              animationDuration: `${heart.duration}s`,
              animationDelay: `${heart.delay}ms`,
            }}
          >
            {heart.emoji}
          </span>
        ))}
      </div>

      {/* Scroll progress */}
      <div className="fixed left-0 top-0 z-50 h-[2px] w-full bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-[#d75b91] via-[#ffc0d5] to-[#e8a7b9] transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      <main className="relative z-10 mx-auto w-[min(900px,92%)]">
        {/* HERO SECTION */}
        <section className="grid min-h-screen place-items-center py-20 text-center">
          <div className="glass-card fade-up relative w-full max-w-[740px] overflow-hidden rounded-[36px] px-7 py-14 sm:px-14 sm:py-20">
            <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#ffabc9] to-transparent" />

            <div className="mb-9 inline-flex items-center gap-2 rounded-full border border-[#f8b6cc]/20 bg-[#f8b6cc]/10 px-5 py-2 text-[11px] font-medium uppercase tracking-[3px] text-[#ffc1d6]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ff9cbd]" />
              A little something for you
            </div>

            <div className="mb-7 text-6xl text-[#ffb1ca] sm:text-7xl">
              <span className="heart-beat inline-block">♡</span>
            </div>

            <p className="mb-4 text-xs uppercase tracking-[5px] text-[#d9a5b7]">
              A message from my heart
            </p>

            <h1 className="mb-7 font-serif text-5xl leading-tight tracking-tight sm:text-7xl">
              Hey,
              <br />
              <span className="bg-gradient-to-r from-[#ffb5cf] via-[#ffe0e9] to-[#e7a0bb] bg-clip-text italic text-transparent">
                ****
              </span>
              <span className="text-[#ff9cbd]">.</span>
            </h1>

            <div className="mx-auto mb-8 h-px w-20 bg-gradient-to-r from-transparent via-[#e9a5bd] to-transparent" />

            <p className="mx-auto max-w-[470px] text-base leading-8 text-white/70 sm:text-lg">
              There are some things I find difficult to say in person... so I
              decided to create this little place just for you.
            </p>

            <button
              type="button"
              onClick={scrollToStory}
              className="group mt-11 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#f6b4cb] to-[#e995b5] px-8 py-4 text-sm font-semibold text-[#401426] shadow-[0_10px_35px_rgba(232,126,166,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_45px_rgba(232,126,166,0.4)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffc1d6]"
            >
              Open My Heart
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>

            <div className="mt-14 flex items-center justify-center gap-3 text-xs tracking-[3px] text-white/35">
              <span className="h-px w-8 bg-white/20" />
              SCROLL TO EXPLORE
              <span className="h-px w-8 bg-white/20" />
            </div>

            <div className="mt-5 animate-bounce text-[#f2abc4]/60">↓</div>
          </div>
        </section>

        {/* STORY SECTION */}
        <section
          id="story"
          ref={storyRef}
          className="grid min-h-screen scroll-mt-10 place-items-center py-20"
        >
          <div className="glass-card relative w-full max-w-[740px] rounded-[36px] px-7 py-14 text-center sm:px-14 sm:py-20">
            <span className="absolute right-8 top-7 font-serif text-6xl text-[#ffb7ce]/10">
              01
            </span>

            <div className="mb-8 text-4xl">🌸</div>

            <p className="mb-5 text-xs uppercase tracking-[4px] text-[#e9a9c0]">
              Something I wanted to tell you
            </p>

            <h2 className="mb-9 font-serif text-4xl leading-tight sm:text-5xl">
              You became
              <br />
              <span className="italic text-[#f5afc7]">special to me.</span>
            </h2>

            <div className="mx-auto mb-9 h-px w-16 bg-[#e7a2bc]/50" />

            <p className="mx-auto max-w-[520px] text-base leading-9 text-white/70 sm:text-lg">
              I don't know exactly when it happened. Maybe it was your smile.
              Maybe it was the way you talk. Or maybe it was just the feeling I
              get whenever you're around.
            </p>

            <p className="mx-auto mt-7 max-w-[520px] text-base leading-9 text-white/70 sm:text-lg">
              Somewhere along the way, I started looking forward to seeing you a
              little more than usual.
            </p>

            <div className="mt-12 text-2xl text-[#e9a9c0]/60">✧</div>
          </div>
        </section>

        {/* REASONS SECTION */}
        <section className="grid min-h-screen place-items-center py-20">
          <div className="glass-card w-full max-w-[740px] rounded-[36px] px-7 py-14 text-center sm:px-14 sm:py-20">
            <div className="mb-8 text-4xl">💗</div>

            <p className="mb-5 text-xs uppercase tracking-[4px] text-[#e9a9c0]">
              A few little things
            </p>

            <h2 className="mb-4 font-serif text-4xl sm:text-5xl">
              What I like
              <br />
              <span className="italic text-[#f5afc7]">about you.</span>
            </h2>

            <p className="mb-12 text-sm text-white/45">
              It's the little things that matter.
            </p>

            <div className="grid gap-4 text-left sm:grid-cols-2">
              {reasons.map((reason, index) => (
                <div
                  key={reason.title}
                  className="group rounded-[22px] border border-white/[0.08] bg-white/[0.045] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#f3a8c4]/30 hover:bg-[#e99ab9]/[0.09]"
                  style={{
                    animation: `fade-up 0.7s ease-out ${index * 150}ms both`,
                  }}
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#f4b2ca]/15 bg-[#f4b2ca]/10 text-2xl transition-transform duration-300 group-hover:scale-110">
                    {reason.icon}
                  </div>

                  <h3 className="mb-3 font-serif text-xl text-[#ffd2e0]">
                    {reason.title}
                  </h3>

                  <p className="text-sm leading-7 text-white/55">
                    {reason.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONFESSION SECTION */}
        <section className="grid min-h-screen place-items-center py-20">
          <div className="glass-card relative w-full max-w-[740px] overflow-hidden rounded-[36px] px-7 py-14 text-center sm:px-14 sm:py-20">
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#e75f96]/10 blur-[80px]" />

            <div className="relative">
              <div className="mb-8 text-4xl">💌</div>

              <p className="mb-5 text-xs uppercase tracking-[4px] text-[#e9a9c0]">
                And finally...
              </p>

              <h2 className="mb-9 font-serif text-4xl leading-tight sm:text-5xl">
                There's something
                <br />
                <span className="italic text-[#f5afc7]">
                  I want to ask you.
                </span>
              </h2>

              <p className="mx-auto max-w-[480px] text-base leading-8 text-white/65">
                I don't want to pressure you, and I don't expect you to feel the
                same way.
              </p>

              <p className="mt-5 text-base leading-8 text-white/65">
                I just wanted to be honest about something...
              </p>

              <div className="my-10 text-6xl text-[#ffabc8]">
                <span className="heart-beat inline-block">♥</span>
              </div>

              {!messageVisible ? (
                <button
                  type="button"
                  onClick={revealMessage}
                  className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#f6b4cb] to-[#e995b5] px-9 py-4 text-sm font-semibold text-[#401426] shadow-[0_10px_35px_rgba(232,126,166,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_45px_rgba(232,126,166,0.4)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffc1d6]"
                >
                  Reveal My Feelings
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              ) : (
                <div
                  ref={messageRef}
                  className="reveal mt-10 rounded-[28px] border border-[#f2b0c8]/20 bg-gradient-to-br from-[#f4a6c1]/10 to-[#ffffff]/[0.035] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.15)] sm:p-10"
                >
                  <div className="mb-7 text-3xl">❤️</div>

                  <h3 className="mb-7 font-serif text-4xl leading-tight text-[#ffd0df] sm:text-5xl">
                    I like you.
                    <br />
                    <span className="italic">A lot.</span>
                  </h3>

                  <div className="mx-auto mb-7 h-px w-16 bg-[#e7a2bc]/50" />

                  <p className="text-base leading-9 text-white/75">
                    You mean more to me than I probably manage to show. And if
                    you're comfortable with it, I'd love the chance to know you
                    even better.
                  </p>

                  <p className="mt-9 font-serif text-lg italic text-[#f1b4ca]">
                    — From someone who thinks you're really special ♡
                  </p>

                  <div className="mt-8 text-2xl text-[#f2abc4]/70">✧</div>
                </div>
              )}

              <p className="mt-12 text-xs tracking-[3px] text-white/30">
                MADE WITH A LITTLE EXTRA LOVE
              </p>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="pb-12 pt-5 text-center">
          <div className="mb-5 text-xl text-[#f3a8c4]">♡</div>

          <p className="font-serif text-lg italic text-white/55">
            Some feelings deserve a little space.
          </p>

          <p className="mt-4 text-[10px] tracking-[3px] text-white/25">
            JUST FOR YOU · WITH LOVE
          </p>
        </footer>
      </main>
    </div>
  );
}
