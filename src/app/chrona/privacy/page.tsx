import styles from "../page.module.css";
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
    <div className={styles.page}>
      <header className="navbar">
        <a href="/chrona/" className="brand">
          <span className="brand-icon">C</span>
          <span>Chrona</span>
        </a>
        <nav aria-label="Chrona">
          <a href="/chrona/">Home</a>
          <a href="/chrona/#features">Features</a>
          <a href="/chrona/privacy">Privacy</a>
          <a
            href="https://github.com/sujanroydev/chrona"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </nav>
      </header>

      <main className="privacy-page">
        <section className="privacy-hero">
          <span className="eyebrow">Privacy</span>
          <h1>Privacy Policy</h1>
          <p>
            Your privacy matters. This policy explains what information Chrona
            processes and how that information is handled.
          </p>
          <p className="updated">Last updated: September 25, 2026</p>
        </section>

        <article className="privacy-content">
          <section>
            <h2>1. About Chrona</h2>
            <p>
              Chrona is a Windows desktop application designed to help you
              understand your laptop usage by tracking active application usage
              and related activity on your computer.
            </p>
            <p>Chrona is developed and maintained by Sujan Roy.</p>
          </section>
          <section>
            <h2>2. Information Chrona Processes</h2>
            <p>
              Depending on the features you use, Chrona may process information
              about your computer activity, including:
            </p>
            <ul>
              <li>Application or process names.</li>
              <li>Time spent using applications.</li>
              <li>Dates and times associated with usage.</li>
              <li>Daily usage totals.</li>
            </ul>
            <p>
              This information is used to provide Chrona&apos;s usage tracking
              and reporting features.
            </p>
          </section>
          <section>
            <h2>3. Local Storage</h2>
            <p>
              Chrona is designed to store usage information locally on your
              Windows computer. The application does not require an account or
              cloud service to provide its core tracking functionality.
            </p>
            <p>
              Usage information stored locally by Chrona remains on your
              computer unless you choose to copy, share, or otherwise transfer
              it yourself.
            </p>
          </section>
          <section>
            <h2>4. Information We Do Not Intentionally Collect</h2>
            <p>
              Chrona does not intentionally collect the contents of files,
              documents, messages, passwords, keystrokes, or the content of
              websites you visit.
            </p>
            <p>
              Chrona&apos;s application tracking is intended to identify the
              applications being used and measure usage time, not to record the
              content of your activity.
            </p>
          </section>
          <section>
            <h2>5. Network Communication</h2>
            <p>
              Chrona&apos;s core usage-tracking functionality is designed to
              work locally on your computer and does not require you to create
              an online account.
            </p>
            <p>
              If future versions of Chrona introduce features that require
              network communication or additional data collection, this privacy
              policy will be updated to explain those changes.
            </p>
          </section>
          <section>
            <h2>6. Third-Party Services</h2>
            <p>
              Chrona may be distributed through third-party platforms such as
              the Microsoft Store or GitHub. Those services may collect
              information according to their own privacy policies when you use
              their websites or services.
            </p>
            <p>
              Chrona&apos;s use of third-party distribution platforms does not
              mean that Chrona receives all information collected by those
              platforms.
            </p>
          </section>
          <section>
            <h2>7. Data Retention and Deletion</h2>
            <p>
              Usage data created by Chrona is stored on your computer. You can
              remove Chrona and its locally stored application data using the
              available Windows controls or by otherwise deleting the relevant
              application data.
            </p>
            <p>
              Because Chrona&apos;s core usage data is stored locally, Sujan Roy
              does not maintain a central copy of that usage history.
            </p>
          </section>
          <section>
            <h2>8. Children&apos;s Privacy</h2>
            <p>
              Chrona is a general-purpose desktop application and is not
              specifically directed at children.
            </p>
          </section>
          <section>
            <h2>9. Changes to This Privacy Policy</h2>
            <p>
              This Privacy Policy may be updated when Chrona&apos;s
              functionality, data practices, or distribution methods change.
            </p>
            <p>
              The latest version will always be published on this page,
              together with the date of the most recent update.
            </p>
          </section>
          <section>
            <h2>10. Contact</h2>
            <p>
              If you have questions about this Privacy Policy or Chrona&apos;s
              privacy practices, you can contact:
            </p>
            <p>
              <strong>Sujan Roy</strong>
              <br />
              Website: <a href="https://sujanroy.in/chrona">sujanroy.in/chrona</a>
            </p>
          </section>
        </article>
      </main>

      <footer>
        <div className="footer-brand">
          <strong>Chrona</strong>
          <span>A lightweight Windows activity tracker.</span>
        </div>
        <div className="footer-links">
          <a href="/chrona/">Chrona</a>
          <a href="/chrona/privacy">Privacy</a>
          <a
            href="https://github.com/sujanroydev/chrona"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <Link href="/">sujanroy.in</Link>
        </div>
        <p>© <CurrentYear /> Sujan Roy</p>
      </footer>
    </div>
  );
}
