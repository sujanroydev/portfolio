import Link from "next/link";
import CurrentYear from "../../components/CurrentYear";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chrona — Windows Laptop Activity Tracker",
  description:
    "Chrona is a lightweight Windows laptop activity tracker that helps you understand how you spend time on your computer.",
  alternates: {
    canonical: "/chrona",
  },
  openGraph: {
    title: "Chrona — Windows Laptop Activity Tracker",
    description:
      "Chrona is a lightweight Windows laptop activity tracker that helps you understand how you spend time on your computer.",
    url: "https://sujanroy.in/chrona",
    siteName: "Chrona",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/chrona/favicon.ico" },
      { url: "/chrona/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/chrona/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/chrona/apple-touch-icon.png",
  },
};

export default function ChronaPage() {
  return (
    <div className="min-h-screen scroll-smooth bg-[#080b12] leading-[1.6] text-[#f5f7fb] [font-family:var(--font-inter),ui-sans-serif,system-ui,sans-serif] [--surface:#10151f] [--surface-light:#171e2b] [--border:#242d3c] [--muted:#9ca7b8] [--primary:#6d7cff] [--primary-hover:#7d8aff] [--max-width:1120px]">
      <header className="mx-auto flex h-[76px] w-[calc(100%_-_40px)] max-w-[1120px] items-center justify-between max-[850px]:h-[70px] max-[650px]:w-[calc(100%_-_32px)]">
        <a href="/chrona/" className="flex items-center gap-2.5 text-[19px] font-bold text-inherit no-underline">
          <span className="grid size-[34px] place-items-center rounded-[9px] bg-[var(--primary)] font-extrabold text-white">C</span>
          <span>Chrona</span>
        </a>
        <nav className="flex gap-7 max-[850px]:hidden" aria-label="Chrona">
          <a className="text-sm text-[var(--muted)] no-underline transition-colors duration-200 hover:text-[var(--text)]" href="#features">Features</a>
          <a className="text-sm text-[var(--muted)] no-underline transition-colors duration-200 hover:text-[var(--text)]" href="#privacy">Privacy</a>
          <a className="text-sm text-[var(--muted)] no-underline transition-colors duration-200 hover:text-[var(--text)]" href="#download">Download</a>
        </nav>
      </header>

      <main>
        <section className="mx-auto grid min-h-[680px] w-[calc(100%_-_40px)] max-w-[1120px] grid-cols-2 items-center gap-[70px] max-[850px]:grid-cols-1 max-[850px]:py-[70px] max-[650px]:w-[calc(100%_-_32px)]">
          <div className="hero-content">
            <span className="mb-[14px] inline-block text-[13px] font-bold uppercase tracking-[0.08em] text-[var(--primary)]">Windows Activity Tracker</span>
            <h1 className="m-0 max-w-[650px] text-[clamp(48px,6vw,76px)] leading-[1.02] tracking-[-0.055em] max-[550px]:text-[46px]">
              Understand how you
              <span className="block text-[var(--primary)]">spend your time.</span>
            </h1>
            <p className="my-7 max-w-[570px] text-lg text-[var(--muted)]">
              Chrona is a lightweight Windows application that tracks laptop
              activity and application usage, helping you understand where your
              screen time goes.
            </p>
            <div className="flex flex-wrap gap-3">
              <a className="inline-flex min-h-[46px] items-center justify-center rounded-[10px] bg-[var(--primary)] px-5 text-sm font-bold text-white no-underline transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--primary-hover)]" href="#download">
                Download for Windows
              </a>
              <a
                className="inline-flex min-h-[46px] items-center justify-center rounded-[10px] border border-[var(--border)] bg-[var(--surface)] px-5 text-sm font-bold text-[var(--text)] no-underline transition duration-200 hover:-translate-y-0.5"
                href="https://github.com/sujanroydev/chrona"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </div>
          </div>

          <div className="flex justify-center max-[850px]:order-2" aria-label="Chrona usage dashboard preview">
            <div className="w-full max-w-[500px] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
              <div className="flex h-[42px] items-center gap-[7px] border-b border-[var(--border)] px-[15px]" aria-hidden="true">
                <span className="size-[9px] rounded-full bg-[#394252]" />
                <span className="size-[9px] rounded-full bg-[#394252]" />
                <span className="size-[9px] rounded-full bg-[#394252]" />
              </div>
              <div className="p-[30px] max-[550px]:p-5">
                <div className="rounded-xl bg-[var(--surface-light)] p-[25px]">
                  <div>
                    <small className="mb-[5px] block text-[var(--muted)]">Today&apos;s usage</small>
                    <strong className="text-[40px] leading-none">7h 28m</strong>
                  </div>
                </div>
                <div className="mt-7">
                  <div className="mb-5 grid grid-cols-[80px_1fr_60px] items-center gap-3 text-xs max-[550px]:grid-cols-[65px_1fr_50px]">
                    <span className="text-[var(--muted)]">Chrome</span>
                    <div className="h-[7px] overflow-hidden rounded-[99px] bg-[#242c3a]">
                      <i className="block h-full w-[72%] rounded-[inherit] bg-[var(--primary)]" />
                    </div>
                    <b className="text-right text-[11px]">3h 12m</b>
                  </div>
                  <div className="mb-5 grid grid-cols-[80px_1fr_60px] items-center gap-3 text-xs max-[550px]:grid-cols-[65px_1fr_50px]">
                    <span className="text-[var(--muted)]">VS Code</span>
                    <div className="h-[7px] overflow-hidden rounded-[99px] bg-[#242c3a]">
                      <i className="block h-full w-[54%] rounded-[inherit] bg-[var(--primary)]" />
                    </div>
                    <b className="text-right text-[11px]">2h 24m</b>
                  </div>
                  <div className="mb-5 grid grid-cols-[80px_1fr_60px] items-center gap-3 text-xs max-[550px]:grid-cols-[65px_1fr_50px]">
                    <span className="text-[var(--muted)]">Other</span>
                    <div className="h-[7px] overflow-hidden rounded-[99px] bg-[#242c3a]">
                      <i className="block h-full w-[32%] rounded-[inherit] bg-[var(--primary)]" />
                    </div>
                    <b className="text-right text-[11px]">1h 52m</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto my-[100px] w-[calc(100%_-_40px)] max-w-[1120px] max-[650px]:w-[calc(100%_-_32px)]">
          <div className="mb-[45px] max-w-[650px]">
            <span className="mb-[14px] inline-block text-[13px] font-bold uppercase tracking-[0.08em] text-[var(--primary)]">Features</span>
            <h2 className="m-0 text-[clamp(32px,4vw,48px)] leading-[1.1] tracking-[-0.035em]">Simple tracking. Useful insights.</h2>
            <p className="text-[var(--muted)]">
              Chrona focuses on giving you a clear picture of your Windows usage
              without unnecessary complexity.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-[18px] max-[850px]:grid-cols-1">
            <article className="rounded-[14px] border border-[var(--border)] bg-[var(--surface)] p-7">
              <div className="mb-[22px] grid size-[42px] place-items-center rounded-[10px] bg-[var(--surface-light)] text-xl text-[var(--primary)]">◷</div>
              <h3 className="mb-2 text-lg">Track screen time</h3>
              <p className="m-0 text-sm text-[var(--muted)]">See how much time you spend using your laptop each day.</p>
            </article>
            <article className="rounded-[14px] border border-[var(--border)] bg-[var(--surface)] p-7">
              <div className="mb-[22px] grid size-[42px] place-items-center rounded-[10px] bg-[var(--surface-light)] text-xl text-[var(--primary)]">▦</div>
              <h3 className="mb-2 text-lg">Application usage</h3>
              <p className="m-0 text-sm text-[var(--muted)]">
                Understand which applications are taking up most of your time.
              </p>
            </article>
            <article className="rounded-[14px] border border-[var(--border)] bg-[var(--surface)] p-7">
              <div className="mb-[22px] grid size-[42px] place-items-center rounded-[10px] bg-[var(--surface-light)] text-xl text-[var(--primary)]">↗</div>
              <h3 className="mb-2 text-lg">Usage history</h3>
              <p className="m-0 text-sm text-[var(--muted)]">Look back at previous days and compare your computer usage.</p>
            </article>
          </div>
        </section>

        <section id="privacy" className="mx-auto my-[100px] grid w-[calc(100%_-_40px)] max-w-[1120px] grid-cols-2 items-center gap-[60px] rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-[60px] max-[850px]:grid-cols-1 max-[850px]:gap-[25px] max-[550px]:px-[22px] max-[550px]:py-[30px] max-[650px]:w-[calc(100%_-_32px)]">
          <div>
            <span className="mb-[14px] inline-block text-[13px] font-bold uppercase tracking-[0.08em] text-[var(--primary)]">Privacy</span>
            <h2 className="m-0 text-[clamp(32px,4vw,48px)] leading-[1.1] tracking-[-0.035em]">Your activity belongs to you.</h2>
          </div>
          <p className="m-0 text-base text-[var(--muted)]">
            Chrona is designed as a local Windows application. Your usage
            information is stored locally on your computer rather than requiring
            a cloud account.
          </p>
        </section>

        <section id="download" className="mx-auto my-[100px] w-[calc(100%_-_40px)] max-w-[1120px] rounded-[20px] border border-[var(--border)] bg-[var(--surface)] px-[60px] py-[60px] text-center max-[550px]:px-[22px] max-[550px]:py-[30px] max-[650px]:w-[calc(100%_-_32px)]">
          <span className="mb-[14px] inline-block text-[13px] font-bold uppercase tracking-[0.08em] text-[var(--primary)]">Get Chrona</span>
          <h2 className="m-0 text-[clamp(32px,4vw,48px)] leading-[1.1] tracking-[-0.035em]">Start tracking your laptop usage.</h2>
          <p className="mx-auto mb-7 mt-5 max-w-[550px] text-base text-[var(--muted)]">Download the latest Windows release and see where your time goes.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              className="inline-flex min-h-[46px] items-center justify-center rounded-[10px] bg-[var(--primary)] px-5 text-sm font-bold text-white no-underline transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--primary-hover)]"
              href="https://github.com/sujanroydev/chrona/releases/latest/download/Chrona.Setup.exe"
            >
              Download Now
            </a>
            <a
              className="inline-flex min-h-[46px] items-center justify-center rounded-[10px] border border-[var(--border)] bg-[var(--surface)] px-5 text-sm font-bold text-[var(--text)] no-underline transition duration-200 hover:-translate-y-0.5"
              href="https://github.com/sujanroydev/chrona/releases"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Releases
            </a>
            <a className="inline-flex min-h-[46px] items-center justify-center rounded-[10px] border border-[var(--border)] bg-[var(--surface)] px-5 text-sm font-bold text-[var(--text)] no-underline transition duration-200 hover:-translate-y-0.5" href="#" aria-disabled="true">
              Microsoft Store — Coming Soon
            </a>
          </div>
        </section>
      </main>

      <footer className="mx-auto mt-[100px] flex w-[calc(100%_-_40px)] max-w-[1120px] items-center justify-between gap-[30px] border-t border-[var(--border)] py-[30px] text-[13px] text-[var(--muted)] max-[850px]:flex-col max-[850px]:items-start">
        <div className="flex flex-col">
          <strong>Chrona</strong>
          <span>A lightweight Windows activity tracker.</span>
        </div>
        <div className="flex gap-5">
          <a className="transition-colors hover:text-[var(--text)]" href="https://github.com/sujanroydev/chrona">GitHub</a>
          <a className="transition-colors hover:text-[var(--text)]" href="/chrona/privacy">Privacy</a>
          <Link className="transition-colors hover:text-[var(--text)]" href="/">sujanroy.in</Link>
        </div>
        <p className="m-0">© <CurrentYear /> Sujan Roy</p>
      </footer>
    </div>
  );
}
