"use client";

import { useEffect, useRef, useState } from "react";

interface FloatingHeart {
  id: number;
  left: string;
  size: string;
  duration: string;
  delay: string;
  emoji: string;
  expiresAt: number;
}

export default function ForYouPage() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [messageVisible, setMessageVisible] = useState(false);
  const heartId = useRef(0);
  const storyRef = useRef<HTMLElement | null>(null);
  const messageRef = useRef<HTMLDivElement | null>(null);

  function createHeart(delay = 0): FloatingHeart {
    const duration = Math.random() * 5 + 6;
    return {
      id: heartId.current++,
      left: `${Math.random() * 100}vw`,
      size: `${Math.random() * 25 + 15}px`,
      duration: `${duration}s`,
      delay: `${delay}ms`,
      emoji: Math.random() > 0.5 ? "❤️" : "💗",
      expiresAt: Date.now() + (duration + delay / 1000) * 1000,
    };
  }

  useEffect(() => {
    const timer = window.setInterval(() => {
      const now = Date.now();
      setHearts((current) => [
        ...current.filter((heart) => heart.expiresAt > now),
        createHeart(),
      ]);
    }, 700);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (messageVisible) {
      messageRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [messageVisible]);

  function revealMessage() {
    setMessageVisible(true);
    setHearts((current) => [
      ...current.filter((heart) => heart.expiresAt > Date.now()),
      ...Array.from({ length: 25 }, (_, index) => createHeart(index * 80)),
    ]);
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top_left,#ff7eb3,transparent_35%),radial-gradient(circle_at_bottom_right,#ff758c,transparent_40%),linear-gradient(135deg,#1a0b16,#3a1028)] font-[Arial,sans-serif] text-white">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        {hearts.map((heart) => (
          <span
            className="absolute bottom-[-50px] animate-[floatUp_linear_forwards] opacity-70 motion-reduce:animate-none"
            key={heart.id}
            style={{
              left: heart.left,
              fontSize: heart.size,
              animationDuration: heart.duration,
              animationDelay: heart.delay,
            }}
          >
            {heart.emoji}
          </span>
        ))}
      </div>
      <main className="relative z-[1] mx-auto w-[min(900px,92%)] pb-[60px] pt-[30px]">
        <section className="grid min-h-screen place-items-center py-10 text-center">
          <div className="w-full max-w-[700px] rounded-[30px] border border-white/20 bg-white/[0.12] px-[30px] py-[50px] shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-[18px] max-[600px]:px-5 max-[600px]:py-10">
            <div className="mb-[15px] text-base uppercase tracking-[2px] opacity-80">I made something for you</div>
            <h1 className="mb-5 text-[clamp(2.5rem,8vw,5.5rem)]">Hey, <span className="text-[#ffd1df] [text-shadow:0_0_20px_rgba(255,170,200,0.8)]">Her Name</span> ❤️</h1>
            <div className="my-5 inline-block animate-[heartbeat_1.3s_infinite] text-[5rem] motion-reduce:animate-none">❤️</div>
            <p className="text-[1.1rem] leading-[1.8] opacity-[0.95] max-[600px]:text-base">
              There are some things I find difficult to say in person... so I
              decided to make this little place just for you.
            </p>
            <button
              type="button"
              className="mt-[30px] cursor-pointer rounded-[50px] border-0 bg-white px-7 py-[15px] text-base font-bold text-[#8b1238] transition duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_12px_30px_rgba(255,255,255,0.25)] focus-visible:outline-2 focus-visible:outline-[#ffd1df] focus-visible:outline-offset-4"
              onClick={() =>
                storyRef.current?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Open My Heart ❤️
            </button>
            <div className="mt-[35px] animate-[bounce_2s_infinite] text-[0.9rem] opacity-70 motion-reduce:animate-none">Scroll down ↓</div>
          </div>
        </section>

        <section id="story" className="grid min-h-screen place-items-center py-10 text-center" ref={storyRef}>
          <div className="w-full max-w-[700px] rounded-[30px] border border-white/20 bg-white/[0.12] px-[30px] py-[50px] shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-[18px] max-[600px]:px-5 max-[600px]:py-10">
            <div className="mb-[15px] text-base uppercase tracking-[2px] opacity-80">
              Something I wanted to tell you
            </div>
            <h2 className="mb-5 text-[clamp(2rem,6vw,3.5rem)]">You became special to me 🌸</h2>
            <p className="text-[1.1rem] leading-[1.8] opacity-[0.95] max-[600px]:text-base">
              I don&apos;t know exactly when it happened. Maybe it was your
              smile. Maybe it was the way you talk. Or maybe it was just the
              feeling I get whenever you&apos;re around.
            </p>
            <br />
            <p className="text-[1.1rem] leading-[1.8] opacity-[0.95] max-[600px]:text-base">
              Somewhere along the way, I started looking forward to seeing you a
              little more than usual.
            </p>
          </div>
        </section>

        <section className="grid min-h-screen place-items-center py-10 text-center">
          <div className="w-full max-w-[700px] rounded-[30px] border border-white/20 bg-white/[0.12] px-[30px] py-[50px] shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-[18px] max-[600px]:px-5 max-[600px]:py-10">
            <div className="mb-[15px] text-base uppercase tracking-[2px] opacity-80">A few reasons</div>
            <h2 className="mb-5 text-[clamp(2rem,6vw,3.5rem)]">What I like about you ❤️</h2>
            <div className="mt-[30px] grid gap-[15px] [&>*:nth-child(2)]:[animation-delay:200ms] [&>*:nth-child(3)]:[animation-delay:400ms] [&>*:nth-child(4)]:[animation-delay:600ms]">
              <div className="[transform:translateY(20px)] animate-[reveal_0.7s_forwards] rounded-[18px] bg-white/10 p-[18px] opacity-0 motion-reduce:animate-none">
                ✨ Your smile can make an ordinary day feel better.
              </div>
              <div className="[transform:translateY(20px)] animate-[reveal_0.7s_forwards] rounded-[18px] bg-white/10 p-[18px] opacity-0 motion-reduce:animate-none">
                🌸 I love the little things that make you uniquely you.
              </div>
              <div className="[transform:translateY(20px)] animate-[reveal_0.7s_forwards] rounded-[18px] bg-white/10 p-[18px] opacity-0 motion-reduce:animate-none">
                ❤️ Somehow, thinking about you always makes me smile.
              </div>
              <div className="[transform:translateY(20px)] animate-[reveal_0.7s_forwards] rounded-[18px] bg-white/10 p-[18px] opacity-0 motion-reduce:animate-none">
                🌙 Being around you feels special in a way I can&apos;t
                completely explain.
              </div>
            </div>
          </div>
        </section>

        <section className="grid min-h-screen place-items-center py-10 text-center">
          <div className="w-full max-w-[700px] rounded-[30px] border border-white/20 bg-white/[0.12] px-[30px] py-[50px] shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-[18px] max-[600px]:px-5 max-[600px]:py-10">
            <div className="mb-[15px] text-base uppercase tracking-[2px] opacity-80">And finally...</div>
            <h2 className="mb-5 text-[clamp(2rem,6vw,3.5rem)]">There&apos;s something I want to ask you ❤️</h2>
            <p className="text-[1.1rem] leading-[1.8] opacity-[0.95] max-[600px]:text-base">
              I don&apos;t want to pressure you, and I don&apos;t expect you to
              feel the same way.
            </p>
            <br />
            <p className="text-[1.1rem] leading-[1.8] opacity-[0.95] max-[600px]:text-base">I just wanted to be honest about something...</p>
            <div className="my-5 inline-block animate-[heartbeat_1.3s_infinite] text-[5rem] motion-reduce:animate-none">💗</div>
            <button
              type="button"
              className="mt-[30px] cursor-pointer rounded-[50px] border-0 bg-white px-7 py-[15px] text-base font-bold text-[#8b1238] transition duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_12px_30px_rgba(255,255,255,0.25)] focus-visible:outline-2 focus-visible:outline-[#ffd1df] focus-visible:outline-offset-4"
              onClick={revealMessage}
            >
              Click for the truth
            </button>
            {messageVisible && (
              <div className="mt-[30px] animate-[reveal_0.7s_forwards] rounded-[20px] bg-white/[0.12] p-[25px]" ref={messageRef}>
                <h2 className="mb-5 text-[clamp(2rem,6vw,3.5rem)]">I like you. A lot. ❤️</h2>
                <p className="text-[1.1rem] leading-[1.8] opacity-[0.95] max-[600px]:text-base">
                  You mean more to me than I probably manage to show. And if
                  you&apos;re comfortable with it, I&apos;d love the chance to
                  know you even better.
                </p>
                <p className="mt-[25px] text-[1.3rem] italic">
                  — From someone who thinks you&apos;re really special ❤️
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
