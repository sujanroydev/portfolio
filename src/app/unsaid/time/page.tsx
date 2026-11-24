"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const TARGET_DATE = "2027-01-01T00:00:00+05:30";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function calculateTimeLeft(): TimeLeft | null {
  const difference = new Date(TARGET_DATE).getTime() - Date.now();

  if (difference <= 0) return null;

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function TimeCard({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-center backdrop-blur-md sm:p-6">
      <p className="font-serif text-4xl font-light tabular-nums text-rose-200 sm:text-6xl">
        {String(value).padStart(2, "0")}
      </p>
      <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-white/40 sm:text-xs">
        {label}
      </p>
    </div>
  );
}

export default function TimePage() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const update = () => setTimeLeft(calculateTimeLeft());

    update();
    const interval = window.setInterval(update, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#100b12] px-5 py-14 text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-500/[0.09] blur-[130px]" />

      {/* Floating decorations */}
      <div className="pointer-events-none absolute left-[12%] top-[15%] animate-pulse text-2xl text-rose-300/30">
        ♡
      </div>
      <div className="pointer-events-none absolute right-[15%] top-[25%] animate-pulse text-xl text-rose-300/30">
        ✦
      </div>
      <div className="pointer-events-none absolute bottom-[20%] left-[18%] animate-pulse text-xl text-purple-300/30">
        ✧
      </div>
      <div className="pointer-events-none absolute bottom-[15%] right-[12%] animate-pulse text-2xl text-rose-300/30">
        ♡
      </div>

      <div className="relative w-full max-w-3xl">
        <Link
          href="/for-you"
          className="mb-12 inline-flex items-center gap-2 text-sm text-white/45 transition hover:text-rose-300"
        >
          ← Back to home
        </Link>

        <section className="rounded-3xl border border-white/10 bg-white/[0.04] px-5 py-12 text-center shadow-2xl backdrop-blur-xl sm:px-12 sm:py-16">
          <div className="mb-7 text-5xl">⏳</div>

          <p className="text-xs uppercase tracking-[0.4em] text-rose-300">
            A moment worth waiting for
          </p>

          <h1 className="mt-5 font-serif text-4xl font-light sm:text-6xl">
            Until that moment...
          </h1>

          <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-white/50">
            Some moments are special not because of when they happen, but
            because of what they mean.
          </p>

          <div className="mx-auto my-10 h-px w-20 bg-rose-300/50" />

          {!mounted ? (
            <div className="py-12 text-sm text-white/40">
              Preparing your countdown...
            </div>
          ) : timeLeft ? (
            <>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                <TimeCard value={timeLeft.days} label="Days" />
                <TimeCard value={timeLeft.hours} label="Hours" />
                <TimeCard value={timeLeft.minutes} label="Minutes" />
                <TimeCard value={timeLeft.seconds} label="Seconds" />
              </div>

              <p className="mt-8 text-xs tracking-[0.2em] text-white/35">
                COUNTING DOWN TO
              </p>

              <p className="mt-3 font-serif text-lg text-rose-200">
                {new Date(TARGET_DATE).toLocaleString("en-IN", {
                  dateStyle: "long",
                  timeStyle: "short",
                  timeZone: "Asia/Kolkata",
                })}
              </p>
            </>
          ) : (
            <div className="animate-[fadeIn_1s_ease-out] py-8">
              <div className="mb-5 text-6xl">🌷</div>

              <h2 className="font-serif text-3xl text-rose-200">
                The moment has arrived!
              </h2>

              <p className="mx-auto mt-5 max-w-sm text-sm leading-8 text-white/60">
                Whatever this moment means, I hope it brings something
                beautiful. And I hope you find a reason to smile today.
              </p>
            </div>
          )}

          <div className="mt-12">
            <p className="font-serif text-lg italic text-white/55">
              "Good things are worth waiting for."
            </p>
            <p className="mt-3 text-2xl text-rose-300">♡</p>
          </div>
        </section>

        <p className="mt-8 text-center text-xs tracking-[0.3em] text-white/25">
          EVERY SECOND COUNTS
        </p>
      </div>

      <style jsx global>{`
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
      `}</style>
    </main>
  );
}
