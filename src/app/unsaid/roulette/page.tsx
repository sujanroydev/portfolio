"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { trackActivity } from "@/lib/unsaid/track-activity";

type Photo = {
  path: string;
  url: string;
};

type PhotoResponse = {
  photos: Photo[];
  message?: string;
};

const messages = [
  "Some moments are too beautiful to be forgotten.",
  "A little moment, just for you.",
  "If only photographs could tell stories.",
  "Some things are better felt than explained.",
  "A moment worth keeping a little longer.",
  "Perhaps this is the one you needed today.",
  "Every picture holds a little piece of time.",
];

function shuffle<T>(items: T[]): T[] {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

export default function RoulettePage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [deck, setDeck] = useState<Photo[]>([]);
  const [current, setCurrent] = useState<Photo | null>(null);
  const [recent, setRecent] = useState<Photo[]>([]);
  const [message, setMessage] = useState(messages[0]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewer, setViewer] = useState(false);

  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let cancelled = false;

    async function loadPhotos() {
      try {
        const response = await fetch("/api/unsaid/her-photos");

        if (!response.ok) throw new Error("Couldn't open the memories.");

        const data = (await response.json()) as PhotoResponse;

        if (cancelled) return;

        const randomized = shuffle(data.photos);

        setPhotos(randomized);
        setDeck(randomized.slice(1));
        setCurrent(randomized[0] ?? null);
        setError("");
      } catch {
        if (!cancelled) {
          setError("Something went wrong. Please try again.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadPhotos();

    return () => {
      cancelled = true;
    };
  }, []);

  const discover = useCallback(() => {
    if (!photos.length) return;

    let nextDeck = deck;

    if (!nextDeck.length) {
      nextDeck = shuffle(
        photos.filter((photo) => photo.path !== current?.path),
      );
    }

    const next = nextDeck[0];

    if (!next) return;

    setRecent((previous) =>
      current
        ? [current, ...previous.filter((p) => p.path !== current.path)].slice(
            0,
            5,
          )
        : previous,
    );

    setCurrent(next);
    setDeck(nextDeck.slice(1));

    setMessage(messages[Math.floor(Math.random() * messages.length)]);
    void trackActivity("roulette", "Memory roulette discovered", { photoPath: next.path }, "photo_opened");
  }, [photos, deck, current]);

  useEffect(() => {
    if (!current) return;

    const image = new Image();
    image.src = current.url;
  }, [current]);

  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#100b10] text-rose-100">
        <div className="text-center">
          <div className="mx-auto mb-5 h-9 w-9 animate-spin rounded-full border-2 border-rose-200/20 border-t-rose-300" />
          <p className="font-serif text-2xl">Finding a little moment...</p>
        </div>
      </main>
    );
  }

  if (error || !current) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#100b10] px-5 text-center text-rose-100">
        <div>
          <p className="mb-4 text-4xl">🥀</p>
          <h1 className="font-serif text-3xl">A little pause</h1>
          <p className="mt-3 text-sm text-white/50">
            {error || "No photographs found."}
          </p>
          <Link
            href="/unsaid"
            className="mt-7 inline-block text-sm text-rose-300"
          >
            Back to home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#100b10] px-5 py-12 text-[#f3e8ed] sm:py-16">
      <div className="pointer-events-none fixed -left-40 top-20 h-96 w-96 rounded-full bg-rose-800/15 blur-[120px]" />
      <div className="pointer-events-none fixed -right-40 bottom-10 h-96 w-96 rounded-full bg-pink-800/10 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl">
        <Link
          href="/unsaid"
          className="text-sm text-white/45 transition hover:text-rose-300"
        >
          ← Back to the beginning
        </Link>

        <header className="mb-12 mt-16 text-center">
          <p className="text-xs tracking-[0.4em] text-rose-300/60 uppercase">
            A little surprise awaits
          </p>

          <h1 className="mt-5 font-serif text-5xl sm:text-7xl">
            Memory <span className="italic text-rose-300">Roulette</span>
          </h1>

          <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-white/45">
            Close your eyes, make a little wish, and let a random moment find
            its way to you.
          </p>
        </header>

        <section className="mx-auto max-w-md">
          <div className="relative rounded-[2rem] border border-rose-100/10 bg-white/[0.035] p-3 shadow-2xl shadow-rose-950/20 sm:p-5">
            <div className="relative overflow-hidden rounded-[1.5rem] bg-[#21171d]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.path}
                  src={current.url}
                  alt="A randomly discovered photograph"
                  onClick={() => setViewer(true)}
                  initial={{
                    opacity: 0,
                    scale: reduceMotion ? 1 : 1.05,
                  }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.6 }}
                  className="aspect-[4/5] max-h-[620px] w-full cursor-zoom-in object-cover"
                />
              </AnimatePresence>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10" />

              <div className="pointer-events-none absolute bottom-6 inset-x-5 text-center">
                <p className="font-serif text-xl italic text-white sm:text-2xl">
                  A moment, just for you ♡
                </p>
              </div>
            </div>

            <div className="px-3 pb-3 pt-7 text-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={message}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="min-h-12 font-serif text-lg italic leading-7 text-rose-100/75"
                >
                  "{message}"
                </motion.p>
              </AnimatePresence>

              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={discover}
                className="mt-7 w-full rounded-full bg-[#e8b8c9] px-7 py-4 text-sm font-medium tracking-wide text-[#25151d] transition hover:bg-[#f3d1dc]"
              >
                ✨ Discover another moment
              </motion.button>

              <button
                onClick={() => setViewer(true)}
                className="mt-4 text-xs text-white/40 transition hover:text-white/80"
              >
                View photograph fullscreen ↗
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-xs tracking-widest text-white/30">
            {photos.length} LITTLE MOMENTS · {recent.length} RECENTLY DISCOVERED
          </p>
        </section>

        {recent.length > 0 && (
          <section className="mt-24">
            <div className="mb-8 text-center">
              <p className="text-xs tracking-[0.35em] text-rose-300/50">
                THE MOMENTS YOU FOUND
              </p>
              <h2 className="mt-3 font-serif text-3xl">
                A Few More Little Things
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
              {recent.map((photo, index) => (
                <motion.button
                  key={photo.path}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setCurrent(photo)}
                  className="overflow-hidden rounded-xl border border-white/10"
                >
                  <img
                    src={photo.url}
                    alt={`Recently discovered photograph ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[3/4] w-full object-cover transition duration-500 hover:scale-105"
                  />
                </motion.button>
              ))}
            </div>
          </section>
        )}

        <footer className="mt-24 border-t border-white/10 py-12 text-center">
          <p className="font-serif text-2xl italic text-rose-100/70">
            "Somewhere between a picture and a feeling."
          </p>
          <p className="mt-4 text-xs tracking-[0.3em] text-white/25">
            MADE WITH LOVE ♡
          </p>
        </footer>
      </div>

      <AnimatePresence>
        {viewer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setViewer(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-5 backdrop-blur-xl"
          >
            <button
              onClick={() => setViewer(false)}
              className="absolute right-6 top-6 text-3xl text-white"
              aria-label="Close viewer"
            >
              ×
            </button>

            <motion.img
              initial={{ scale: reduceMotion ? 1 : 0.95 }}
              animate={{ scale: 1 }}
              src={current.url}
              alt="Full-size photograph"
              onClick={(event) => event.stopPropagation()}
              className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
