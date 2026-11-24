import styles from "./page.module.css";
import Reveal from "../../components/portfolio/Reveal";
import CurrentYear from "../../components/CurrentYear";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BuildFromCode",
  description:
    "BuildFromCode is a developer-focused YouTube channel where you learn by building real apps—from idea and coding to deployment using modern web technologies.",
  alternates: {
    canonical: "/bfc",
  },
  openGraph: {
    title: "BuildFromCode",
    description:
      "BuildFromCode is a developer-focused YouTube channel where you learn by building real apps—from idea and coding to deployment using modern web technologies.",
    url: "https://sujanroy.in/bfc",
    siteName: "BuildFromCode",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/bfc/favicon.ico" },
      { url: "/bfc/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/bfc/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/bfc/apple-touch-icon.png",
  },
};

export default function BuildFromCodePage() {
  return (
    <div className={styles.page}>
      <header className="nav">
        <div className="logo">BuildFromCode</div>
        <nav className="nav-links" aria-label="BuildFromCode">
          <a href="#about">About</a>
          <a href="#content">Content</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Connect</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <h1>
              Build Real Apps.
              <br />
              Not Just Tutorials.
            </h1>
            <p>
              A developer-focused YouTube channel where every video turns into
              a real project: from idea → code → deployment.
            </p>
            <div className="cta">
              <a
                href="https://www.youtube.com/@BuildFromCode"
                target="_blank"
                rel="noopener noreferrer"
                className="btn red"
              >
                ▶ Watch YouTube
              </a>
              <a href="#projects" className="btn ghost">
                Explore Projects
              </a>
            </div>
            <div className="stats">
              <div>
                <h3>10+</h3>
                <p>Projects</p>
              </div>
              <div>
                <h3>Frontend</h3>
                <p>Focused</p>
              </div>
              <div>
                <h3>Real</h3>
                <p>Builds</p>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <h2>Why BuildFromCode?</h2>
          <p className="subtitle">
            Most tutorials teach syntax. This channel teaches thinking.
          </p>
          <div className="glass-grid">
            <Reveal as="article" className="glass-card">
              <h3>Project First</h3>
              <p>You learn by building apps people actually use.</p>
            </Reveal>
            <Reveal as="article" className="glass-card">
              <h3>No Fluff</h3>
              <p>Only practical coding, no unnecessary theory dumps.</p>
            </Reveal>
            <Reveal as="article" className="glass-card">
              <h3>Modern Stack</h3>
              <p>HTML, CSS, JS, APIs, PWA, and real deployment.</p>
            </Reveal>
          </div>
        </section>

        <section id="content" className="dark-section">
          <h2>What You’ll See Here</h2>
          <div className="timeline">
            <div>💡 Idea breakdown → how apps are planned</div>
            <div>🧠 Logic building → how features work internally</div>
            <div>⚙️ Coding → step-by-step implementation</div>
            <div>🚀 Deployment → real-world hosting</div>
          </div>
        </section>

        <section id="projects" className="section">
          <h2>Featured Builds</h2>
          <div className="grid">
            <Reveal as="article" className="card">
              <h3>Todo App</h3>
              <p>Local storage based task manager with clean UI.</p>
            </Reveal>
            <Reveal as="article" className="card">
              <h3>Push System</h3>
              <p>Browser notifications using service workers.</p>
            </Reveal>
            <Reveal as="article" className="card">
              <h3>PWA Installable App</h3>
              <p>Offline-ready web app like mobile apps.</p>
            </Reveal>
            <Reveal as="article" className="card">
              <h3>Dark Mode Engine</h3>
              <p>Theme system using CSS variables + JS.</p>
            </Reveal>
          </div>
        </section>

        <section id="contact" className="cta-section">
          <h2>Start Building With Me</h2>
          <p>Subscribe and follow along as real apps are built from scratch.</p>
          <a
            className="btn red"
            href="https://www.youtube.com/@BuildFromCode"
            target="_blank"
            rel="noopener noreferrer"
          >
            Subscribe Now
          </a>
        </section>
      </main>

      <footer>
        <p>© <CurrentYear /> BuildFromCode • Built for developers</p>
      </footer>
    </div>
  );
}
