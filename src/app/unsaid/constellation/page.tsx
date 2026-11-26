"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { trackActivity } from "@/lib/unsaid/track-activity";

type Photo = {
  path: string;
  url: string;
};

type PhotoResponse = {
  photos: Photo[];
  message?: string;
};

type Star = {
  x: number;
  y: number;
  size: number;
  delay: number;
  group: number;
};

const WIDTH = 1000;
const HEIGHT = 650;

function random(seed: number) {
  const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return value - Math.floor(value);
}

function createStars(count: number): Star[] {
  return Array.from({ length: count }, (_, i) => {
    const group = i % 12;
    const centerX = 80 + (group % 4) * 280;
    const centerY = 90 + Math.floor(group / 4) * 230;

    return {
      x: Math.max(18, Math.min(982, centerX + (random(i + 1) - 0.5) * 220)),
      y: Math.max(18, Math.min(632, centerY + (random(i + 100) - 0.5) * 170)),
      size: 2 + random(i + 200) * 4,
      delay: random(i + 300) * 4,
      group,
    };
  });
}

function shuffle<T>(items: T[]): T[] {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

export default function ConstellationPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [discovered, setDiscovered] = useState<Set<number>>(() => new Set());
  const [selected, setSelected] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAll, setShowAll] = useState(false);

  const reduceMotion = useReducedMotion();

  const stars = useMemo(() => createStars(photos.length), [photos.length]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch("/api/unsaid/her-photos");

        if (!response.ok) {
          throw new Error("Unable to reach the stars.");
        }

        const data = (await response.json()) as PhotoResponse;

        if (!cancelled) {
          setPhotos(shuffle(data.photos));
        }
      } catch {
        if (!cancelled) {
          setError("The night sky is taking a little longer to appear.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  const reveal = useCallback((index: number) => {
    setDiscovered((previous) => {
      const next = new Set(previous);
      next.add(index);
      return next;
    });

    setSelected(index);
    if (!discovered.has(index)) {
      void trackActivity("constellation", "Constellation star discovered", { starIndex: index + 1, photoPath: photos[index]?.path }, "item_revealed");
    } else {
      void trackActivity("constellation", "Discovered constellation photo opened", { starIndex: index + 1, photoPath: photos[index]?.path }, "photo_opened");
    }
  }, [discovered, photos]);

  const discoverRandom = useCallback(() => {
    const remaining = photos
      .map((_, index) => index)
      .filter((index) => !discovered.has(index));

    if (!remaining.length) {
      setShowAll(true);
      return;
    }

    const next = remaining[Math.floor(Math.random() * remaining.length)];
    reveal(next);
  }, [photos, discovered, reveal]);

  const closeViewer = () => setSelected(null);

  useEffect(() => {
    if (selected === null) return;

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") closeViewer();

      if (event.key === "ArrowRight") {
        setSelected((current) =>
          current === null ? null : (current + 1) % photos.length,
        );
      }

      if (event.key === "ArrowLeft") {
        setSelected((current) =>
          current === null
            ? null
            : (current - 1 + photos.length) % photos.length,
        );
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selected, photos.length]);

  // Connect discovered stars belonging to the same constellation.
  const connections = useMemo(() => {
    const result: { from: number; to: number }[] = [];

    for (let i = 0; i < photos.length; i++) {
      if (!discovered.has(i)) continue;

      for (let j = i + 1; j < photos.length; j++) {
        if (!discovered.has(j)) continue;
        if (stars[i].group !== stars[j].group) continue;

        const dx = stars[i].x - stars[j].x;
        const dy = stars[i].y - stars[j].y;

        if (dx * dx + dy * dy < 145 * 145) {
          result.push({ from: i, to: j });
          break;
        }
      }
    }

    return result;
  }, [photos.length, discovered, stars]);

  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#080b19] text-rose-100">
        <div className="text-center">
          <div className="mx-auto mb-6 h-10 w-10 animate-spin rounded-full border-2 border-rose-200/20 border-t-rose-300" />
          <p className="font-serif text-2xl">Preparing your universe...</p>
        </div>
      </main>
    );
  }

  if (error || photos.length === 0) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#080b19] px-5 text-center text-white">
        <div>
          <p className="mb-5 text-4xl">✦</p>
          <h1 className="font-serif text-3xl">The sky is quiet tonight.</h1>
          <p className="mt-4 text-sm text-white/50">
            {error || "No memories have been added yet."}
          </p>
          <Link href="/unsaid" className="mt-7 inline-block text-rose-300">
            Return home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080b19] text-[#f4edf6]">
      {/* Background atmosphere */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-indigo-700/15 blur-[140px]" />
        <div className="absolute -right-40 top-[40%] h-96 w-96 rounded-full bg-purple-700/15 blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-rose-900/10 blur-[130px]" />

        {Array.from({ length: 65 }, (_, i) => (
          <motion.span
            key={i}
            className="absolute h-[2px] w-[2px] rounded-full bg-white"
            style={{
              left: `${random(i + 900) * 100}%`,
              top: `${random(i + 1000) * 100}%`,
              opacity: 0.2 + random(i + 1100) * 0.6,
            }}
            animate={reduceMotion ? undefined : { opacity: [0.2, 0.9, 0.2] }}
            transition={{
              duration: 2 + random(i + 1200) * 4,
              repeat: Infinity,
              delay: random(i + 1300) * 3,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-12">
        {/* Navigation */}
        <Link
          href="/unsaid"
          className="inline-flex items-center gap-2 text-sm text-white/45 transition hover:text-white"
        >
          <span>←</span> Back to Unsaid
        </Link>

        {/* Hero */}
        <header className="mx-auto mb-12 mt-16 max-w-2xl text-center sm:mt-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] tracking-[0.5em] text-indigo-200/60 uppercase sm:text-xs"
          >
            A universe of little moments
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-6 font-serif text-5xl leading-tight sm:text-7xl"
          >
            A Sky Full of
            <br />
            <span className="italic text-rose-200">Her</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mx-auto mt-6 max-w-md text-sm leading-7 text-white/45"
          >
            Every little star holds a memory. Wander through this little
            universe and discover what each one is hiding.
          </motion.p>
        </header>

        {/* Progress */}
        <div className="mx-auto mb-8 flex max-w-3xl items-center justify-between gap-4">
          <div>
            <p className="text-xs tracking-widest text-white/40 uppercase">
              Memories discovered
            </p>
            <p className="mt-1 font-serif text-2xl">
              {discovered.size}
              <span className="text-white/30"> / {photos.length}</span>
            </p>
          </div>

          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-rose-300"
              animate={{
                width: `${(discovered.size / photos.length) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <span className="text-xs text-rose-200/60">
            {Math.round((discovered.size / photos.length) * 100)}%
          </span>
        </div>

        {/* Star map */}
        <section className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-indigo-100/10 bg-[#10152b]/70 shadow-2xl shadow-black/30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(88,91,170,0.13),transparent_70%)]" />

          <div className="relative aspect-[1/1] w-full sm:aspect-[1.54/1]">
            {/* Constellation lines */}
            <svg
              viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full"
            >
              {connections.map((line, index) => (
                <motion.line
                  key={`${line.from}-${line.to}`}
                  x1={stars[line.from].x}
                  y1={stars[line.from].y}
                  x2={stars[line.to].x}
                  y2={stars[line.to].y}
                  stroke="#e9c4e8"
                  strokeWidth="1.2"
                  strokeOpacity="0.35"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.015 }}
                />
              ))}
            </svg>

            {/* Stars */}
            {stars.map((star, index) => {
              const isDiscovered = discovered.has(index);
              const isSelected = selected === index;

              return (
                <button
                  key={photos[index].path}
                  onClick={() => reveal(index)}
                  aria-label={
                    isDiscovered
                      ? `View discovered memory ${index + 1}`
                      : `Discover star ${index + 1}`
                  }
                  className="absolute z-10 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-rose-200"
                  style={{
                    left: `${(star.x / WIDTH) * 100}%`,
                    top: `${(star.y / HEIGHT) * 100}%`,
                    width: 34,
                    height: 34,
                  }}
                >
                  <motion.span
                    className="relative block rounded-full"
                    style={{
                      width: isDiscovered ? 10 : star.size,
                      height: isDiscovered ? 10 : star.size,
                      background: isDiscovered ? "#ffd8ef" : "#a8b5e8",
                      boxShadow: isDiscovered
                        ? "0 0 8px 3px rgba(255,190,230,.75), 0 0 22px 7px rgba(255,170,220,.25)"
                        : "0 0 8px rgba(190,205,255,.45)",
                    }}
                    animate={
                      isSelected
                        ? { scale: [1, 1.9, 1] }
                        : reduceMotion
                          ? undefined
                          : { opacity: [0.4, 1, 0.4], scale: [1, 1.35, 1] }
                    }
                    transition={{
                      duration: isSelected ? 0.7 : 2.5 + star.delay,
                      repeat: isSelected ? 0 : Infinity,
                      delay: star.delay,
                    }}
                  />

                  {isDiscovered && (
                    <span className="pointer-events-none absolute -inset-1 rounded-full border border-rose-100/40" />
                  )}
                </button>
              );
            })}

            {/* Map labels */}
            <div className="pointer-events-none absolute bottom-4 left-5 text-[9px] tracking-[0.3em] text-white/25 uppercase">
              Touch a star to discover a memory
            </div>

            <div className="pointer-events-none absolute right-5 top-5 text-[9px] tracking-[0.25em] text-indigo-200/30 uppercase">
              ∞ Her little universe
            </div>
          </div>
        </section>

        {/* Legend */}
        <div className="mt-5 flex flex-wrap justify-center gap-7 text-[11px] text-white/40">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#a8b5e8]" />
            Undiscovered
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#ffd8ef] shadow-[0_0_8px_#ffd8ef]" />
            Discovered
          </div>
          <div className="flex items-center gap-2">
            <span className="h-px w-5 bg-rose-200/50" />
            Connected memories
          </div>
        </div>

        {/* Random discovery */}
        <section className="mx-auto my-20 max-w-xl text-center">
          <p className="font-serif text-2xl italic text-white/75 sm:text-3xl">
            Not every beautiful thing needs to be searched for.
          </p>

          <p className="mt-4 text-sm text-white/35">
            Let the universe choose your next little discovery.
          </p>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={discoverRandom}
            className="mt-8 rounded-full border border-rose-200/30 bg-rose-100/10 px-9 py-4 text-sm tracking-wide text-rose-100 shadow-lg shadow-rose-950/20 backdrop-blur-xl transition hover:bg-rose-100/20"
          >
            ✦ Find me a memory
          </motion.button>
        </section>

        {/* Discovered memories */}
        {discovered.size > 0 && (
          <section className="mx-auto mb-20 max-w-5xl">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[10px] tracking-[0.35em] text-rose-200/50 uppercase">
                  Your discoveries
                </p>
                <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
                  Little stars, little stories
                </h2>
              </div>

              <button
                onClick={() => setShowAll((value) => !value)}
                className="text-xs text-rose-200/60 transition hover:text-rose-100"
              >
                {showAll ? "Show less ↑" : "See all ↓"}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-5">
              {Array.from(discovered)
                .sort((a, b) => a - b)
                .slice(0, showAll ? undefined : 10)
                .map((index) => (
                  <motion.button
                    key={photos[index].path}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => setSelected(index)}
                    className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 text-left"
                  >
                    <img
                      src={photos[index].url}
                      alt={`Discovered memory ${index + 1}`}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[3/4] w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                      <span className="text-[10px] tracking-widest text-rose-100/80">
                        ✦ MEMORY {index + 1}
                      </span>
                    </div>
                  </motion.button>
                ))}
            </div>
          </section>
        )}

        {/* Ending */}
        <footer className="border-t border-white/10 py-16 text-center">
          <p className="font-serif text-2xl italic text-rose-100/70 sm:text-3xl">
            "Even the stars are just little stories of light."
          </p>

          <p className="mt-5 text-[10px] tracking-[0.4em] text-white/25 uppercase">
            A little universe, made with love
          </p>

          <Link
            href="/unsaid"
            className="mt-8 inline-block text-xs text-white/40 transition hover:text-rose-200"
          >
            Back to Unsaid ↑
          </Link>
        </footer>
      </div>

      {/* Cinematic memory viewer */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            key="memory-viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeViewer}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#070813]/95 p-5 backdrop-blur-2xl"
          >
            <button
              onClick={closeViewer}
              aria-label="Close viewer"
              className="absolute right-6 top-6 z-20 grid h-11 w-11 place-items-center rounded-full border border-white/15 text-2xl text-white/70 transition hover:bg-white/10"
            >
              ×
            </button>

            <button
              onClick={(event) => {
                event.stopPropagation();
                setSelected((selected + photos.length - 1) % photos.length);
              }}
              aria-label="Previous memory"
              className="absolute left-3 top-1/2 z-20 rounded-full border border-white/15 px-4 py-3 text-white/70 hover:bg-white/10 sm:left-8"
            >
              ←
            </button>

            <motion.div
              key={photos[selected].path}
              initial={{
                opacity: 0,
                scale: reduceMotion ? 1 : 0.92,
                y: reduceMotion ? 0 : 15,
              }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              onClick={(event) => event.stopPropagation()}
              className="flex max-h-[90vh] max-w-[85vw] flex-col items-center"
            >
              <img
                src={photos[selected].url}
                alt={`Memory ${selected + 1}`}
                className="max-h-[75vh] max-w-full rounded-2xl object-contain shadow-2xl shadow-black/50"
              />

              <p className="mt-5 font-serif text-xl italic text-rose-100/80">
                A little piece of this universe ♡
              </p>

              <p className="mt-2 text-[10px] tracking-[0.3em] text-white/35 uppercase">
                STAR {selected + 1} · {photos.length} MEMORIES
              </p>
            </motion.div>

            <button
              onClick={(event) => {
                event.stopPropagation();
                setSelected((selected + 1) % photos.length);
              }}
              aria-label="Next memory"
              className="absolute right-3 top-1/2 z-20 rounded-full border border-white/15 px-4 py-3 text-white/70 hover:bg-white/10 sm:right-8"
            >
              →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
