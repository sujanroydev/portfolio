import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0c0d12] px-6 text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/[0.07] blur-[120px]" />

      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
          backgroundSize: "55px 55px",
          maskImage:
            "radial-gradient(ellipse at center, black, transparent 75%)",
        }}
      />

      <section className="relative z-10 mx-auto w-full max-w-2xl text-center">
        <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-zinc-400">
          <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-400" />
          ROUTE NOT FOUND
        </div>

        <div className="relative mb-8">
          <h1 className="select-none font-mono text-[clamp(110px,24vw,220px)] font-bold leading-none tracking-[-0.09em] text-white/[0.06]">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              4<span className="text-indigo-400">0</span>4
            </span>
          </div>
        </div>

        <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-indigo-400">
          Unexpected destination
        </p>

        <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
          Looks like you're
          <br />
          <span className="text-zinc-500">off the map.</span>
        </h2>

        <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-zinc-400 sm:text-base">
          The page you're looking for doesn't exist, has been moved, or the URL
          might have a small mistake.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 rounded-lg bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-indigo-100"
          >
            <span>Back to homepage</span>
            <span className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              ↗
            </span>
          </Link>
        </div>

        <div className="mx-auto mt-20 flex max-w-xs items-center justify-center gap-3 text-[10px] tracking-[0.2em] text-zinc-600">
          <span className="h-px flex-1 bg-white/10" />
          <span>BUILT WITH CURIOSITY</span>
          <span className="h-px flex-1 bg-white/10" />
        </div>
      </section>
    </main>
  );
}
