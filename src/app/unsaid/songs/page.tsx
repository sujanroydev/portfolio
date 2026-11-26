"use client";

import { useState } from "react";
import Link from "next/link";
import { trackActivity } from "@/lib/unsaid/track-activity";

const songs = [
  {
    title: "Perfect",
    artist: "Ed Sheeran",
    language: "English",
    emoji: "🌹",
    color: "from-rose-300 to-pink-950",
    note: "Some songs make ordinary feelings sound extraordinary.",
    url: "https://www.youtube.com/results?search_query=Ed+Sheeran+Perfect+official",
  },
  {
    title: "Until I Found You",
    artist: "Stephen Sanchez",
    language: "English",
    emoji: "💌",
    color: "from-orange-200 to-red-950",
    note: "A song that feels like a page from an old love story.",
    url: "https://www.youtube.com/results?search_query=Stephen+Sanchez+Until+I+Found+You+official",
  },
  {
    title: "Heeriye",
    artist: "Jasleen Royal ft. Arijit Singh",
    language: "Hindi",
    emoji: "🌙",
    color: "from-purple-300 to-indigo-950",
    note: "For those moments when a melody says enough.",
    url: "https://www.youtube.com/results?search_query=Heeriye+Jasleen+Royal+Arijit+Singh",
  },
  {
    title: "O Maahi",
    artist: "Arijit Singh",
    language: "Hindi",
    emoji: "✨",
    color: "from-amber-200 to-orange-950",
    note: "A melody that stays in your mind long after it ends.",
    url: "https://www.youtube.com/results?search_query=O+Maahi+Arijit+Singh+official",
  },
  {
    title: "Husn",
    artist: "Anuv Jain",
    language: "Hindi",
    emoji: "🦋",
    color: "from-blue-200 to-slate-950",
    note: "Sometimes admiration is difficult to put into words.",
    url: "https://www.youtube.com/results?search_query=Anuv+Jain+Husn+official",
  },
  {
    title: "Aankhon Se Batana",
    artist: "Dikshant",
    language: "Hindi",
    emoji: "🌷",
    color: "from-pink-200 to-fuchsia-950",
    note: "A soft song for the things left unsaid.",
    url: "https://www.youtube.com/results?search_query=Dikshant+Aankhon+Se+Batana+official",
  },
];

export default function SongsPage() {
  const [selectedSong, setSelectedSong] = useState<
    (typeof songs)[number] | null
  >(null);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#100b12] px-5 py-12 text-white sm:px-8">
      {/* Background glow */}
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-rose-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-purple-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl">
        <Link
          href="/unsaid"
          className="inline-flex items-center gap-2 text-sm text-white/45 transition hover:text-rose-300"
        >
          ← Back to home
        </Link>

        {/* Header */}
        <header className="mx-auto mb-14 mt-12 max-w-2xl text-center">
          <div className="mb-5 text-5xl">🎧</div>

          <p className="mb-3 text-xs uppercase tracking-[0.4em] text-rose-300">
            A playlist for you
          </p>

          <h1 className="font-serif text-5xl font-light sm:text-7xl">
            Songs & Feelings
          </h1>

          <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-white/50 sm:text-base">
            A few songs, a few feelings, and maybe a little something hidden
            between the melodies.
          </p>
        </header>

        {/* Playlist information */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <div>
            <p className="text-xs tracking-[0.25em] text-rose-300">
              PERSONAL COLLECTION
            </p>
            <h2 className="mt-2 font-serif text-2xl">For your ears ♡</h2>
            <p className="mt-1 text-sm text-white/40">
              {songs.length} songs · A little bit of everything
            </p>
          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-300/10 text-2xl">
            ♫
          </div>
        </div>

        {/* Song list */}
        <section className="grid gap-4 sm:grid-cols-2">
          {songs.map((song, index) => (
            <article
              key={song.title}
              className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-rose-300/30 hover:bg-white/[0.07]"
            >
              <div
                className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${song.color} text-3xl shadow-lg`}
              >
                {song.emoji}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[10px] tracking-[0.2em] text-rose-300">
                  TRACK {String(index + 1).padStart(2, "0")}
                </p>

                <h3 className="mt-1 truncate font-serif text-xl">
                  {song.title}
                </h3>

                <p className="mt-1 truncate text-sm text-white/45">
                  {song.artist}
                </p>

                <p className="mt-2 text-[10px] uppercase tracking-widest text-white/30">
                  {song.language}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedSong(song);
                  void trackActivity("songs", "Song note opened", { songTitle: song.title, artist: song.artist, trackIndex: index + 1 }, "item_revealed");
                }}
                aria-label={`Read note about ${song.title}`}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-rose-300 transition hover:border-rose-300 hover:bg-rose-300 hover:text-[#24131c]"
              >
                ♡
              </button>
            </article>
          ))}
        </section>

        {/* Closing message */}
        <footer className="mt-20 border-t border-white/10 py-10 text-center">
          <div className="mb-4 text-3xl text-rose-300">♫</div>

          <p className="font-serif text-xl italic text-white/60 sm:text-2xl">
            "Some feelings are easier to hear than to say."
          </p>

          <p className="mt-5 text-xs tracking-[0.3em] text-white/30">
            MADE WITH CARE ♡
          </p>
        </footer>
      </div>

      {/* Song note modal */}
      {selectedSong && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onClick={() => setSelectedSong(null)}
          role="presentation"
        >
          <article
            role="dialog"
            aria-modal="true"
            aria-labelledby="song-title"
            className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#1b121d] p-8 text-center shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setSelectedSong(null)}
              className="absolute right-5 top-4 text-2xl text-white/40 transition hover:text-white"
            >
              ×
            </button>

            <div className="mb-6 text-6xl">{selectedSong.emoji}</div>

            <p className="text-xs tracking-[0.3em] text-rose-300">
              A LITTLE NOTE
            </p>

            <h2 id="song-title" className="mt-3 font-serif text-3xl">
              {selectedSong.title}
            </h2>

            <p className="mt-2 text-sm text-white/40">{selectedSong.artist}</p>

            <div className="mx-auto my-7 h-px w-16 bg-rose-300/40" />

            <p className="font-serif text-lg italic leading-8 text-white/70">
              "{selectedSong.note}"
            </p>

            <a
              href={selectedSong.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 block w-full rounded-full bg-rose-300 px-6 py-3 text-sm font-medium text-[#24131c] transition hover:bg-rose-200"
            >
              Find this song on YouTube ↗
            </a>

            <button
              type="button"
              onClick={() => setSelectedSong(null)}
              className="mt-4 text-sm text-white/40 transition hover:text-white"
            >
              Close
            </button>
          </article>
        </div>
      )}
    </main>
  );
}
