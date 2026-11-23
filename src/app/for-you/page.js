"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

export default function ForYouPage() {
  const [hearts, setHearts] = useState([]);
  const [messageVisible, setMessageVisible] = useState(false);
  const heartId = useRef(0);
  const storyRef = useRef(null);
  const messageRef = useRef(null);

  function createHeart(delay = 0) {
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
    <div className={styles.page}>
      <div className={styles.hearts} aria-hidden="true">
        {hearts.map((heart) => (
          <span
            className={styles.heart}
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
      <main className={styles.main}>
        <section className={styles.screen}>
          <div className={styles.card}>
            <div className={styles.smallText}>I made something for you</div>
            <h1>
              Hey, <span className={styles.name}>Her Name</span> ❤️
            </h1>
            <div className={styles.bigHeart}>❤️</div>
            <p>
              There are some things I find difficult to say in person... so I
              decided to make this little place just for you.
            </p>
            <button
              type="button"
              onClick={() =>
                storyRef.current?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Open My Heart ❤️
            </button>
            <div className={styles.scroll}>Scroll down ↓</div>
          </div>
        </section>

        <section id="story" className={styles.screen} ref={storyRef}>
          <div className={styles.card}>
            <div className={styles.smallText}>
              Something I wanted to tell you
            </div>
            <h2>You became special to me 🌸</h2>
            <p>
              I don&apos;t know exactly when it happened. Maybe it was your
              smile. Maybe it was the way you talk. Or maybe it was just the
              feeling I get whenever you&apos;re around.
            </p>
            <br />
            <p>
              Somewhere along the way, I started looking forward to seeing you a
              little more than usual.
            </p>
          </div>
        </section>

        <section className={styles.screen}>
          <div className={styles.card}>
            <div className={styles.smallText}>A few reasons</div>
            <h2>What I like about you ❤️</h2>
            <div className={styles.reasons}>
              <div className={styles.reason}>
                ✨ Your smile can make an ordinary day feel better.
              </div>
              <div className={styles.reason}>
                🌸 I love the little things that make you uniquely you.
              </div>
              <div className={styles.reason}>
                ❤️ Somehow, thinking about you always makes me smile.
              </div>
              <div className={styles.reason}>
                🌙 Being around you feels special in a way I can&apos;t
                completely explain.
              </div>
            </div>
          </div>
        </section>

        <section className={styles.screen}>
          <div className={styles.card}>
            <div className={styles.smallText}>And finally...</div>
            <h2>There&apos;s something I want to ask you ❤️</h2>
            <p>
              I don&apos;t want to pressure you, and I don&apos;t expect you to
              feel the same way.
            </p>
            <br />
            <p>I just wanted to be honest about something...</p>
            <div className={styles.bigHeart}>💗</div>
            <button type="button" onClick={revealMessage}>
              Click for the truth
            </button>
            {messageVisible && (
              <div className={styles.loveMessage} ref={messageRef}>
                <h2>I like you. A lot. ❤️</h2>
                <p>
                  You mean more to me than I probably manage to show. And if
                  you&apos;re comfortable with it, I&apos;d love the chance to
                  know you even better.
                </p>
                <p className={styles.signature}>
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
