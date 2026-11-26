"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import LazyImage from "@/components/unsaid/LazyImage";

type Photo = {
  path: string;
  url: string;
};

type PhotoResponse = {
  photos: Photo[];
  message?: string;
};

const HEARTS = ["♡", "✦", "✧", "🥀", "💖"];

export default function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const reduceMotion = useReducedMotion();

  // Page-entrance variants.
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.11, delayChildren: 0.15 },
    },
  };

  // Decorative floating hearts that drift upward. Disabled when the user
  // prefers reduced motion.
  const floatingHearts = useMemo(() => {
    if (reduceMotion) return [];
    return Array.from({ length: 16 }, (_, i) => {
      const drift = -110 - ((i * 17) % 50);
      return {
        id: i,
        char: HEARTS[i % HEARTS.length],
        left: 8 + ((i * 13) % 88),
        top: 10 + ((i * 19) % 88),
        delay: i * 0.6,
        duration: 10 + i * 1.1,
        size: 15 + (i % 6) * 5,
        drift,
      };
    });
  }, [reduceMotion]);

  const activePathRef = useRef<string | undefined>(undefined);
  activePathRef.current = photos[activeIndex]?.path;

  // Fetch private images from the authenticated API.
  const loadPhotos = useCallback(async () => {
    try {
      const response = await fetch("/api/unsaid/her-photos", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Unable to access the private gallery.");
      }

      const data = (await response.json()) as PhotoResponse;

      for (let i = data.photos.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [data.photos[i], data.photos[j]] = [data.photos[j], data.photos[i]];
      }

      const currentPath = activePathRef.current;
      const nextIndex = data.photos.findIndex(
        (photo) => photo.path === currentPath,
      );

      if (nextIndex >= 0) {
        setActiveIndex(nextIndex);
      }

      setPhotos(data.photos);
      setError("");
    } catch {
      setError("Couldn't load the photos. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPhotos();

    const refresh = window.setInterval(
      () => {
        void loadPhotos();
      },
      8 * 60 * 1000,
    );

    return () => window.clearInterval(refresh);
  }, [loadPhotos]);

  useEffect(() => {
    if (photos.length < 2) return;

    const nextIndex = (activeIndex + 1) % photos.length;
    const img = new window.Image();

    img.src = photos[nextIndex].url;
  }, [activeIndex, photos]);

  // Automatic slideshow.
  useEffect(() => {
    if (!isPlaying || photos.length < 2 || selectedIndex !== null) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % photos.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, [isPlaying, photos.length, selectedIndex]);

  // Keyboard navigation for the full-screen viewer.
  useEffect(() => {
    if (selectedIndex === null) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedIndex(null);
      }

      if (event.key === "ArrowRight") {
        setSelectedIndex((current) =>
          current === null ? null : (current + 1) % photos.length,
        );
      }

      if (event.key === "ArrowLeft") {
        setSelectedIndex((current) =>
          current === null
            ? null
            : (current - 1 + photos.length) % photos.length,
        );
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, photos.length]);

  const nextPhoto = () => {
    if (photos.length < 2) return;

    setActiveIndex((current) => (current + 1) % photos.length);
  };

  const previousPhoto = () => {
    if (photos.length < 2) return;

    setActiveIndex((current) => (current - 1 + photos.length) % photos.length);
  };

  const nextSelected = () => {
    setSelectedIndex((current) =>
      current === null || photos.length === 0
        ? null
        : (current + 1) % photos.length,
    );
  };

  const previousSelected = () => {
    setSelectedIndex((current) =>
      current === null || photos.length === 0
        ? null
        : (current - 1 + photos.length) % photos.length,
    );
  };

  const activePhoto = photos[activeIndex];
  const selectedPhoto = selectedIndex === null ? null : photos[selectedIndex];

  // Loading state.
  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#0d0d0d] px-5 text-rose-100">
        <div className="text-center">
          <div className="mx-auto mb-6 h-10 w-10 animate-spin rounded-full border-2 border-rose-200/20 border-t-rose-300" />

          <p className="font-serif text-2xl">Gathering little moments...</p>

          <p className="mt-3 text-sm text-rose-100/40">
            Just a little patience ♡
          </p>
        </div>
      </main>
    );
  }

  // Error and empty states.
  if (error || photos.length === 0) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#0d0d0d] px-5 text-center text-rose-100">
        <div className="max-w-md">
          <p className="mb-5 text-5xl">🥀</p>

          <h1 className="font-serif text-3xl">
            {error ? "A little problem..." : "A quiet little gallery"}
          </h1>

          <p className="mt-4 text-sm leading-7 text-rose-100/50">
            {error || "No photographs have been added yet."}
          </p>

          <button
            onClick={() => {
              setLoading(true);
              void loadPhotos();
            }}
            className="mt-8 rounded-full border border-rose-200/20 px-7 py-3 text-sm transition hover:bg-rose-200/10"
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0d0d0d] text-[#f3e8ed] selection:bg-rose-300/30">
      {/* Background glow */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none fixed -left-40 top-20 h-96 w-96 rounded-full bg-rose-900/20 blur-[130px]"
      />

      <motion.div
        animate={{ x: [0, -25, 0], y: [0, -25, 0] }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        className="pointer-events-none fixed -right-40 top-[50%] h-96 w-96 rounded-full bg-pink-900/10 blur-[130px]"
      />

      {/* Floating decorative hearts */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        {floatingHearts.map((heart) => (
          <motion.span
            key={heart.id}
            style={{
              left: `${heart.left}%`,
              top: `${heart.top}%`,
              fontSize: heart.size,
              color: "rgba(232, 121, 149, 0.15)",
            }}
            initial={{ y: 0, opacity: 0 }}
            animate={{
              y: heart.drift,
              opacity: [0, 0.45, 0],
            }}
            transition={{
              delay: heart.delay,
              duration: heart.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {heart.char}
          </motion.span>
        ))}
      </div>

      {/* Header */}
      <header className="relative px-5 pb-12 pt-20 text-center">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-5 text-xs tracking-[0.4em] text-rose-300/60 uppercase"
        >
          A collection of little moments
        </motion.p>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="font-serif text-5xl leading-tight text-rose-100 sm:text-7xl"
        >
          Through My Eyes
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mx-auto mt-6 max-w-md text-sm leading-7 text-rose-100/50"
        >
          Some pictures, some memories, and a hundred little reasons to pause
          for a moment.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-8 text-rose-300/70"
        >
          ♡ <span className="mx-2 text-xs">{photos.length} photographs</span> ♡
        </motion.div>
      </header>

      {/* Cinematic slideshow */}
      <section className="relative mx-auto max-w-6xl px-5 py-10">
        <div className="relative mx-auto aspect-[4/5] max-h-[680px] max-w-[430px] overflow-hidden rounded-[2rem] border border-rose-100/10 bg-[#181316] shadow-2xl shadow-rose-950/30">
          <AnimatePresence mode="wait">
            <motion.img
              key={activePhoto.path}
              src={activePhoto.url}
              alt={`Photograph ${activeIndex + 1}`}
              initial={{
                opacity: 0,
                scale: reduceMotion ? 1 : 1.08,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: reduceMotion ? 0 : [0, -10, 0],
              }}
              exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
              transition={{
                duration: reduceMotion ? 0.15 : 1.1,
                y: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="absolute inset-0 h-full w-full cursor-zoom-in object-cover"
              onClick={() => setSelectedIndex(activeIndex)}
            />
          </AnimatePresence>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

          {/* Floating photo previews */}
          {photos.slice(1, 5).map((photo, index) => (
            <motion.button
              key={photo.path}
              onClick={() => setSelectedIndex(index + 1)}
              className="absolute z-10 hidden w-24 overflow-hidden rounded-xl border-4 border-white bg-white shadow-2xl sm:block md:w-32"
              style={{
                top: `${12 + index * 17}%`,
                left: index % 2 === 0 ? "5%" : "auto",
                right: index % 2 === 1 ? "5%" : "auto",
              }}
              animate={
                reduceMotion
                  ? { y: 0, rotate: 0 }
                  : {
                      y: [0, -13, 0],
                      rotate: index % 2 === 0 ? [-7, -3, -7] : [7, 3, 7],
                    }
              }
              transition={{
                duration: 4 + index,
                repeat: reduceMotion ? 0 : Infinity,
                ease: "easeInOut",
              }}
              aria-label={`Open photograph ${index + 2}`}
            >
              <img
                src={photo.url}
                alt={`Floating photograph ${index + 2}`}
                loading="lazy"
                className="aspect-[3/4] w-full object-cover"
              />
            </motion.button>
          ))}

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 sm:p-8">
            <div>
              <motion.p
                key={`caption-${activeIndex}`}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="font-serif text-2xl italic text-white"
              >
                A moment to remember
              </motion.p>

              <motion.p
                key={`counter-${activeIndex}`}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="mt-2 text-xs text-white/60"
              >
                {activeIndex + 1} / {photos.length}
              </motion.p>
            </div>

            <button
              onClick={() => setSelectedIndex(activeIndex)}
              className="rounded-full border border-white/30 bg-black/30 px-4 py-2 text-xs backdrop-blur-md transition hover:bg-white/20"
            >
              View photo ↗
            </button>
          </div>
        </div>

        {/* Slideshow controls */}
        <div className="mt-8 flex items-center justify-center gap-5">
          <button
            onClick={previousPhoto}
            aria-label="Previous photo"
            className="grid h-11 w-11 place-items-center rounded-full border border-rose-100/15 transition hover:bg-rose-100/10"
          >
            ←
          </button>

          <button
            onClick={() => setIsPlaying((playing) => !playing)}
            className="min-w-28 rounded-full border border-rose-100/20 px-5 py-3 text-xs tracking-wider transition hover:bg-rose-100/10"
          >
            {isPlaying ? "Ⅱ Pause" : "▶ Play"}
          </button>

          <button
            onClick={nextPhoto}
            aria-label="Next photo"
            className="grid h-11 w-11 place-items-center rounded-full border border-rose-100/15 transition hover:bg-rose-100/10"
          >
            →
          </button>
        </div>
      </section>

      {/* Polaroid wall */}
      <section className="relative mx-auto max-w-7xl px-5 py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="mb-14 text-center"
        >
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-3 text-xs tracking-[0.35em] text-rose-300/50 uppercase"
          >
            Scattered moments
          </motion.p>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="font-serif text-4xl text-rose-100 sm:text-5xl"
          >
            Little Pieces of You
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-4 text-sm text-rose-100/40"
          >
            Every picture has its own little place.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        >
          {photos.map((photo, index) => (
            <motion.button
              key={photo.path}
              onClick={() => setSelectedIndex(index)}
              initial={{
                opacity: 0,
                y: reduceMotion ? 0 : 25,
              }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              whileHover={
                reduceMotion
                  ? {}
                  : {
                      scale: 1.08,
                      rotate: 0,
                      zIndex: 30,
                      boxShadow: "0 24px 48px -12px rgba(0, 0, 0, 0.55)",
                    }
              }
              whileTap={reduceMotion ? {} : { scale: 0.96 }}
              transition={{ duration: reduceMotion ? 0 : 0.35 }}
              style={{
                rotate: `${((index % 5) - 2) * 2}deg`,
              }}
              className="group rounded-sm bg-[#f3e8ed] p-2 pb-5 text-left shadow-xl shadow-black/30 sm:p-3 sm:pb-7 border border-transparent hover:border-rose-200/40 transition-colors"
            >
              <LazyImage
                src={photo.url}
                alt={`Gallery photograph ${index + 1}`}
                className="aspect-[3/4] w-full bg-[#d7c5ca] object-cover"
              />

              <p className="mt-3 text-center font-serif text-xs italic text-[#51434a] sm:text-sm">
                A little moment ♡
              </p>
            </motion.button>
          ))}
        </motion.div>
      </section>

      {/* 3D-style carousel */}
      <section className="relative overflow-hidden px-5 py-20">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs tracking-[0.35em] text-rose-300/50 uppercase">
            One more look
          </p>

          <h2 className="font-serif text-4xl text-rose-100">
            A Different Perspective
          </h2>
        </div>

        <div className="relative mx-auto flex h-[380px] max-w-4xl items-center justify-center [perspective:1000px]">
          {[-1, 0, 1].map((offset) => {
            const index =
              (activeIndex + offset + photos.length) % photos.length;

            return (
              <motion.button
                key={`${photos[index].path}-${offset}`}
                onClick={() => {
                  setActiveIndex(index);

                  if (offset === 0) {
                    setSelectedIndex(index);
                  }
                }}
                animate={{
                  x: offset * 190,
                  scale: offset === 0 ? 1 : 0.75,
                  rotateY: offset * -25,
                  opacity: offset === 0 ? 1 : 0.45,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.65,
                  ease: "easeInOut",
                }}
                className="absolute h-[300px] w-[210px] overflow-hidden rounded-2xl border border-rose-100/15 bg-[#20171c] shadow-2xl"
                style={{
                  zIndex: offset === 0 ? 10 : 1,
                  transformStyle: "preserve-3d",
                }}
                aria-label={`Show photo ${index + 1}`}
              >
                <img
                  src={photos[index].url}
                  alt={`Carousel photograph ${index + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </motion.button>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center gap-5">
          <button
            onClick={previousPhoto}
            className="rounded-full border border-rose-100/20 px-6 py-3 text-sm transition hover:bg-rose-100/10"
          >
            ← Previous
          </button>

          <button
            onClick={nextPhoto}
            className="rounded-full border border-rose-100/20 px-6 py-3 text-sm transition hover:bg-rose-100/10"
          >
            Next →
          </button>
        </div>
      </section>

      {/* Closing */}
      <motion.footer
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="relative px-5 py-24 text-center"
      >
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="font-serif text-3xl italic text-rose-100 sm:text-4xl"
        >
          Some moments deserve to stay.
        </motion.p>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-5 text-sm text-rose-100/40"
        >
          A little collection, made with love. 🥀
        </motion.p>
      </motion.footer>

      {/* Full-screen photo viewer */}
      <AnimatePresence>
        {selectedPhoto && selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-5 backdrop-blur-xl"
          >
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute right-6 top-6 z-20 grid h-11 w-11 place-items-center rounded-full border border-white/20 text-2xl text-white transition hover:bg-white/10"
              aria-label="Close photo viewer"
            >
              ×
            </button>

            <button
              onClick={(event) => {
                event.stopPropagation();
                previousSelected();
              }}
              className="absolute left-3 z-20 rounded-full border border-white/20 px-4 py-3 text-white transition hover:bg-white/10 sm:left-8"
              aria-label="Previous image"
            >
              ←
            </button>

            <motion.div
              key={selectedPhoto.path}
              initial={{
                opacity: 0,
                scale: reduceMotion ? 1 : 0.9,
                y: reduceMotion ? 0 : 20,
              }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{
                opacity: 0,
                scale: reduceMotion ? 1 : 0.9,
              }}
              onClick={(event) => event.stopPropagation()}
              className="flex max-h-[85vh] max-w-[85vw] flex-col items-center"
            >
              <motion.img
                src={selectedPhoto.url}
                alt={`Selected photograph ${selectedIndex + 1}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="max-h-[78vh] max-w-full rounded-xl object-contain shadow-2xl"
              />

              <p className="mt-4 text-sm text-white/60">
                {selectedIndex + 1} / {photos.length}
              </p>
            </motion.div>

            <button
              onClick={(event) => {
                event.stopPropagation();
                nextSelected();
              }}
              className="absolute right-3 z-20 rounded-full border border-white/20 px-4 py-3 text-white transition hover:bg-white/10 sm:right-8"
              aria-label="Next image"
            >
              →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
