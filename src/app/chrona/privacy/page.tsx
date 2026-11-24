import Link from "next/link";
import CurrentYear from "../../../components/CurrentYear";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Chrona",
  description:
    "Privacy Policy for Chrona, a lightweight Windows laptop activity tracker.",
  alternates: {
    canonical: "/chrona/privacy",
  },
  openGraph: {
    title: "Privacy Policy — Chrona",
    description:
      "Privacy Policy for Chrona, a lightweight Windows laptop activity tracker.",
    url: "https://sujanroy.in/chrona/privacy",
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

export default function ChronaPrivacyPage() {
  return (
    <div className="min-h-screen scroll-smooth bg-[#080b12] leading-[1.6] text-[#f5f7fb] [font-family:var(--font-inter),ui-sans-serif,system-ui,sans-serif] [--surface:#10151f] [--surface-light:#171e2b] [--border:#242d3c] [--muted:#9ca7b8] [--primary:#6d7cff] [--primary-hover:#7d8aff] [--max-width:1120px]">
      <header className="mx-auto flex h-[76px] w-[calc(100%_-_40px)] max-w-[1120px] items-center justify-between max-[850px]:h-[70px] max-[650px]:w-[calc(100%_-_32px)]">
        <a href="/chrona/" className="flex items-center gap-2.5 text-[19px] font-bold text-inherit no-underline">
          <span className="grid size-[34px] place-items-center rounded-[9px] bg-[var(--primary)] font-extrabold text-white">C</span>
          <span>Chrona</span>
        </a>
        <nav className="flex gap-7 max-[850px]:gap-[18px] max-[650px]:hidden" aria-label="Chrona">
          <a className="text-sm text-[var(--muted)] no-underline transition-colors duration-200 hover:text-[var(--text)]" href="/chrona/">Home</a>
          <a className="text-sm text-[var(--muted)] no-underline transition-colors duration-200 hover:text-[var(--text)]" href="/chrona/#features">Features</a>
          <a className="text-sm text-[var(--muted)] no-underline transition-colors duration-200 hover:text-[var(--text)]" href="/chrona/privacy">Privacy</a>
          <a
            className="text-sm text-[var(--muted)] no-underline transition-colors duration-200 hover:text-[var(--text)]"
            href="https://github.com/sujanroydev/chrona"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </nav>
      </header>

      <main className="mx-auto w-[calc(100%_-_40px)] max-w-[860px] pb-[100px] pt-[90px] max-[650px]:w-[calc(100%_-_32px)] max-[650px]:pb-[70px] max-[650px]:pt-[55px]">
        <section className="border-b border-[var(--border)] pb-[55px] max-[650px]:pb-10">
          <span className="mb-[14px] inline-block text-[13px] font-bold uppercase tracking-[0.08em] text-[var(--primary)]">Privacy</span>
          <h1 className="m-0 text-[clamp(44px,7vw,68px)] leading-[1.05] tracking-[-0.05em] max-[650px]:text-[44px]">Privacy Policy</h1>
          <p className="mt-[22px] max-w-[680px] text-[17px] leading-[1.7] text-[var(--muted)] max-[650px]:text-base">
            Your privacy matters. This policy explains what information Chrona
            processes and how that information is handled.
          </p>
          <p className="mt-[18px] text-[13px] text-[#737e90]">Last updated: September 25, 2026</p>
        </section>

        <article className="pt-[55px] max-[650px]:pt-10">
          <section className="mb-12 last:mb-0 max-[650px]:mb-10">
            <h2 className="mb-4 text-2xl leading-[1.3] tracking-[-0.02em] text-[var(--text)] max-[650px]:text-[21px]">1. About Chrona</h2>
            <p className="mb-4 text-[15px] leading-[1.8] text-[var(--muted)] last:mb-0">
              Chrona is a Windows desktop application designed to help you
              understand your laptop usage by tracking active application usage
              and related activity on your computer.
            </p>
            <p className="mb-4 text-[15px] leading-[1.8] text-[var(--muted)] last:mb-0">Chrona is developed and maintained by Sujan Roy.</p>
          </section>
          <section className="mb-12 last:mb-0 max-[650px]:mb-10">
            <h2 className="mb-4 text-2xl leading-[1.3] tracking-[-0.02em] text-[var(--text)] max-[650px]:text-[21px]">2. Information Chrona Processes</h2>
            <p className="mb-4 text-[15px] leading-[1.8] text-[var(--muted)] last:mb-0">
              Depending on the features you use, Chrona may process information
              about your computer activity, including:
            </p>
            <ul className="my-[18px] pl-6 text-[var(--muted)]">
              <li className="my-2 pl-1 text-[15px] leading-[1.7] marker:text-[var(--primary)]">Application or process names.</li>
              <li className="my-2 pl-1 text-[15px] leading-[1.7] marker:text-[var(--primary)]">Time spent using applications.</li>
              <li className="my-2 pl-1 text-[15px] leading-[1.7] marker:text-[var(--primary)]">Dates and times associated with usage.</li>
              <li className="my-2 pl-1 text-[15px] leading-[1.7] marker:text-[var(--primary)]">Daily usage totals.</li>
            </ul>
            <p className="mb-4 text-[15px] leading-[1.8] text-[var(--muted)] last:mb-0">
              This information is used to provide Chrona&apos;s usage tracking
              and reporting features.
            </p>
          </section>
          <section className="mb-12 last:mb-0 max-[650px]:mb-10">
            <h2 className="mb-4 text-2xl leading-[1.3] tracking-[-0.02em] text-[var(--text)] max-[650px]:text-[21px]">3. Local Storage</h2>
            <p className="mb-4 text-[15px] leading-[1.8] text-[var(--muted)] last:mb-0">
              Chrona is designed to store usage information locally on your
              Windows computer. The application does not require an account or
              cloud service to provide its core tracking functionality.
            </p>
            <p className="mb-4 text-[15px] leading-[1.8] text-[var(--muted)] last:mb-0">
              Usage information stored locally by Chrona remains on your
              computer unless you choose to copy, share, or otherwise transfer
              it yourself.
            </p>
          </section>
          <section className="mb-12 last:mb-0 max-[650px]:mb-10">
            <h2 className="mb-4 text-2xl leading-[1.3] tracking-[-0.02em] text-[var(--text)] max-[650px]:text-[21px]">4. Information We Do Not Intentionally Collect</h2>
            <p className="mb-4 text-[15px] leading-[1.8] text-[var(--muted)] last:mb-0">
              Chrona does not intentionally collect the contents of files,
              documents, messages, passwords, keystrokes, or the content of
              websites you visit.
            </p>
            <p className="mb-4 text-[15px] leading-[1.8] text-[var(--muted)] last:mb-0">
              Chrona&apos;s application tracking is intended to identify the
              applications being used and measure usage time, not to record the
              content of your activity.
            </p>
          </section>
          <section className="mb-12 last:mb-0 max-[650px]:mb-10">
            <h2 className="mb-4 text-2xl leading-[1.3] tracking-[-0.02em] text-[var(--text)] max-[650px]:text-[21px]">5. Network Communication</h2>
            <p className="mb-4 text-[15px] leading-[1.8] text-[var(--muted)] last:mb-0">
              Chrona&apos;s core usage-tracking functionality is designed to
              work locally on your computer and does not require you to create
              an online account.
            </p>
            <p className="mb-4 text-[15px] leading-[1.8] text-[var(--muted)] last:mb-0">
              If future versions of Chrona introduce features that require
              network communication or additional data collection, this privacy
              policy will be updated to explain those changes.
            </p>
          </section>
          <section className="mb-12 last:mb-0 max-[650px]:mb-10">
            <h2 className="mb-4 text-2xl leading-[1.3] tracking-[-0.02em] text-[var(--text)] max-[650px]:text-[21px]">6. Third-Party Services</h2>
            <p className="mb-4 text-[15px] leading-[1.8] text-[var(--muted)] last:mb-0">
              Chrona may be distributed through third-party platforms such as
              the Microsoft Store or GitHub. Those services may collect
              information according to their own privacy policies when you use
              their websites or services.
            </p>
            <p className="mb-4 text-[15px] leading-[1.8] text-[var(--muted)] last:mb-0">
              Chrona&apos;s use of third-party distribution platforms does not
              mean that Chrona receives all information collected by those
              platforms.
            </p>
          </section>
          <section className="mb-12 last:mb-0 max-[650px]:mb-10">
            <h2 className="mb-4 text-2xl leading-[1.3] tracking-[-0.02em] text-[var(--text)] max-[650px]:text-[21px]">7. Data Retention and Deletion</h2>
            <p className="mb-4 text-[15px] leading-[1.8] text-[var(--muted)] last:mb-0">
              Usage data created by Chrona is stored on your computer. You can
              remove Chrona and its locally stored application data using the
              available Windows controls or by otherwise deleting the relevant
              application data.
            </p>
            <p className="mb-4 text-[15px] leading-[1.8] text-[var(--muted)] last:mb-0">
              Because Chrona&apos;s core usage data is stored locally, Sujan Roy
              does not maintain a central copy of that usage history.
            </p>
          </section>
          <section className="mb-12 last:mb-0 max-[650px]:mb-10">
            <h2 className="mb-4 text-2xl leading-[1.3] tracking-[-0.02em] text-[var(--text)] max-[650px]:text-[21px]">8. Children&apos;s Privacy</h2>
            <p className="mb-4 text-[15px] leading-[1.8] text-[var(--muted)] last:mb-0">
              Chrona is a general-purpose desktop application and is not
              specifically directed at children.
            </p>
          </section>
          <section className="mb-12 last:mb-0 max-[650px]:mb-10">
            <h2 className="mb-4 text-2xl leading-[1.3] tracking-[-0.02em] text-[var(--text)] max-[650px]:text-[21px]">9. Changes to This Privacy Policy</h2>
            <p className="mb-4 text-[15px] leading-[1.8] text-[var(--muted)] last:mb-0">
              This Privacy Policy may be updated when Chrona&apos;s
              functionality, data practices, or distribution methods change.
            </p>
            <p className="mb-4 text-[15px] leading-[1.8] text-[var(--muted)] last:mb-0">
              The latest version will always be published on this page,
              together with the date of the most recent update.
            </p>
          </section>
          <section className="mb-12 last:mb-0 max-[650px]:mb-10">
            <h2 className="mb-4 text-2xl leading-[1.3] tracking-[-0.02em] text-[var(--text)] max-[650px]:text-[21px]">10. Contact</h2>
            <p className="mb-4 text-[15px] leading-[1.8] text-[var(--muted)] last:mb-0">
              If you have questions about this Privacy Policy or Chrona&apos;s
              privacy practices, you can contact:
            </p>
            <p className="mb-4 text-[15px] leading-[1.8] text-[var(--muted)] last:mb-0">
              <strong>Sujan Roy</strong>
              <br />
              Website: <a className="text-[var(--primary)] transition-colors hover:text-[var(--primary-hover)] hover:underline" href="https://sujanroy.in/chrona">sujanroy.in/chrona</a>
            </p>
          </section>
        </article>
      </main>

      <footer className="mx-auto my-0 flex w-[calc(100%_-_40px)] max-w-[1120px] items-center justify-between gap-[30px] border-t border-[var(--border)] py-[30px] text-[13px] text-[var(--muted)] max-[850px]:flex-wrap max-[650px]:w-[calc(100%_-_32px)] max-[650px]:flex-col max-[650px]:items-start max-[650px]:gap-5">
        <div className="flex flex-col gap-0.5">
          <strong>Chrona</strong>
          <span>A lightweight Windows activity tracker.</span>
        </div>
        <div className="flex items-center gap-5 max-[650px]:flex-wrap max-[650px]:gap-x-[18px] max-[650px]:gap-y-3">
          <a className="transition-colors hover:text-[var(--text)]" href="/chrona/">Chrona</a>
          <a className="transition-colors hover:text-[var(--text)]" href="/chrona/privacy">Privacy</a>
          <a
            className="transition-colors hover:text-[var(--text)]"
            href="https://github.com/sujanroydev/chrona"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <Link className="transition-colors hover:text-[var(--text)]" href="/">sujanroy.in</Link>
        </div>
        <p className="m-0">© <CurrentYear /> Sujan Roy</p>
      </footer>
    </div>
  );
}
