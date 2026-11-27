import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#09090b] px-6 text-white">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(59,130,246,0.12),transparent_55%)]" />

      <div className="relative z-10 w-full max-w-xl text-center">
        <p className="mb-5 font-mono text-sm tracking-widest text-blue-400">
          BUILD_FROM_CODE / ERROR
        </p>

        <h1 className="mb-2 text-8xl font-bold tracking-tighter text-white sm:text-9xl">
          404
        </h1>

        <div className="mx-auto mb-8 max-w-sm rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left font-mono text-sm shadow-2xl">
          <p className="text-zinc-500">
            <span className="text-purple-400">const</span> page =
          </p>
          <p className="pl-5 text-red-400">undefined;</p>
          <p className="mt-3 text-zinc-500">
            <span className="text-purple-400">throw new</span>{" "}
            <span className="text-yellow-300">Error</span>(
          </p>
          <p className="pl-5 text-green-400">"Page not found"</p>
          <p className="text-zinc-500">);</p>
        </div>

        <h2 className="mb-3 text-xl font-semibold sm:text-2xl">
          Looks like this page didn't compile.
        </h2>

        <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-zinc-400 sm:text-base">
          The page you're looking for doesn't exist, may have been moved, or has
          been lost somewhere in the codebase.
        </p>

        <Link
          href="/bfc"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-400 active:scale-95"
        >
          <span>←</span>
          Back to BuildFromCode
        </Link>

        <p className="mt-12 font-mono text-xs text-zinc-600">
          Keep building. Keep learning. Keep shipping.
        </p>
      </div>
    </main>
  );
}
