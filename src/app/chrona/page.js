import styles from "./page.module.css";
import Link from "next/link";
import CurrentYear from "../../components/CurrentYear";

export const metadata = {
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
    <div className={styles.page}>
      <header className="navbar">
        <a href="/chrona/" className="brand">
          <span className="brand-icon">C</span>
          <span>Chrona</span>
        </a>
        <nav aria-label="Chrona">
          <a href="#features">Features</a>
          <a href="#privacy">Privacy</a>
          <a href="#download">Download</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <span className="eyebrow">Windows Activity Tracker</span>
            <h1>
              Understand how you
              <span>spend your time.</span>
            </h1>
            <p>
              Chrona is a lightweight Windows application that tracks laptop
              activity and application usage, helping you understand where your
              screen time goes.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#download">
                Download for Windows
              </a>
              <a
                className="button secondary"
                href="https://github.com/sujanroydev/chrona"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </div>
          </div>

          <div className="hero-preview" aria-label="Chrona usage dashboard preview">
            <div className="window">
              <div className="window-bar" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div className="dashboard">
                <div className="dashboard-header">
                  <div>
                    <small>Today&apos;s usage</small>
                    <strong>7h 28m</strong>
                  </div>
                </div>
                <div className="usage-bars">
                  <div className="usage-row">
                    <span>Chrome</span>
                    <div className="bar">
                      <i style={{ width: "72%" }} />
                    </div>
                    <b>3h 12m</b>
                  </div>
                  <div className="usage-row">
                    <span>VS Code</span>
                    <div className="bar">
                      <i style={{ width: "54%" }} />
                    </div>
                    <b>2h 24m</b>
                  </div>
                  <div className="usage-row">
                    <span>Other</span>
                    <div className="bar">
                      <i style={{ width: "32%" }} />
                    </div>
                    <b>1h 52m</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="section">
          <div className="section-heading">
            <span className="eyebrow">Features</span>
            <h2>Simple tracking. Useful insights.</h2>
            <p>
              Chrona focuses on giving you a clear picture of your Windows usage
              without unnecessary complexity.
            </p>
          </div>
          <div className="feature-grid">
            <article className="feature-card">
              <div className="feature-icon">◷</div>
              <h3>Track screen time</h3>
              <p>See how much time you spend using your laptop each day.</p>
            </article>
            <article className="feature-card">
              <div className="feature-icon">▦</div>
              <h3>Application usage</h3>
              <p>
                Understand which applications are taking up most of your time.
              </p>
            </article>
            <article className="feature-card">
              <div className="feature-icon">↗</div>
              <h3>Usage history</h3>
              <p>Look back at previous days and compare your computer usage.</p>
            </article>
          </div>
        </section>

        <section id="privacy" className="privacy-section">
          <div>
            <span className="eyebrow">Privacy</span>
            <h2>Your activity belongs to you.</h2>
          </div>
          <p>
            Chrona is designed as a local Windows application. Your usage
            information is stored locally on your computer rather than requiring
            a cloud account.
          </p>
        </section>

        <section id="download" className="download-section">
          <span className="eyebrow">Get Chrona</span>
          <h2>Start tracking your laptop usage.</h2>
          <p>Download the latest Windows release and see where your time goes.</p>
          <div className="download-actions">
            <a
              className="button primary"
              href="https://github.com/sujanroydev/chrona/releases/latest/download/Chrona.Setup.exe"
            >
              Download Now
            </a>
            <a
              className="button secondary"
              href="https://github.com/sujanroydev/chrona/releases"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Releases
            </a>
            <a className="button secondary" href="#" aria-disabled="true">
              Microsoft Store — Coming Soon
            </a>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-brand">
          <strong>Chrona</strong>
          <span>A lightweight Windows activity tracker.</span>
        </div>
        <div className="footer-links">
          <a href="https://github.com/sujanroydev/chrona">GitHub</a>
          <a href="/chrona/privacy">Privacy</a>
          <Link href="/">sujanroy.in</Link>
        </div>
        <p>© <CurrentYear /> Sujan Roy</p>
      </footer>
    </div>
  );
}
