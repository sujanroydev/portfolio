import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080810] px-6 text-white">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(139,92,246,0.14),transparent_60%)]" />

      <div className="relative z-10 w-full max-w-xl text-center">
        <p className="mb-6 font-mono text-xs tracking-[0.35em] text-violet-400 uppercase">
          CHRONA · TIME LOST
        </p>

        <div className="mb-5">
          <h1 className="text-8xl font-extralight tracking-tighter text-white sm:text-9xl">
            404
          </h1>
        </div>

        <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-violet-400/20 bg-violet-400/5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-violet-300"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </svg>
        </div>

        <h2 className="mb-3 text-2xl font-medium tracking-tight sm:text-3xl">
          Lost in time?
        </h2>

        <p className="mx-auto mb-9 max-w-sm text-sm leading-relaxed text-zinc-400 sm:text-base">
          Even time has its missing moments. Unfortunately, this page is one of
          them. Let's get you back on track.
        </p>

        <Link
          href="/chrona"
          className="inline-flex items-center gap-3 rounded-full border border-violet-400/30 bg-violet-500/10 px-7 py-3 text-sm font-medium text-violet-200 transition-all duration-300 hover:border-violet-400/60 hover:bg-violet-500/20 active:scale-95"
        >
          <span>←</span>
          Return to Chrona
        </Link>

        <p className="mt-14 text-xs tracking-widest text-zinc-600">
          EVERY SECOND COUNTS.
        </p>
      </div>
    </main>
  );
}
