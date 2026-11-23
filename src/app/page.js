import About from "../components/portfolio/About";
import Contact from "../components/portfolio/Contact";
import Footer from "../components/portfolio/Footer";
import GitHubStats from "../components/portfolio/GitHubStats";
import Hero from "../components/portfolio/Hero";
import Navbar from "../components/portfolio/Navbar";
import Projects from "../components/portfolio/Projects";
import Reveal from "../components/portfolio/Reveal";
import Skills from "../components/portfolio/Skills";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <GitHubStats />
        <Contact />
        <Reveal as="section" id="social-links" className="section">
          <h2>Find Me Online</h2>
          <div className="social-links">
            <a href="https://github.com/sujanroydev" target="_blank" rel="noopener noreferrer" className="btn">
              GitHub
            </a>
            <a href="https://linkedin.com/in/sujanroydev" target="_blank" rel="noopener noreferrer" className="btn">
              LinkedIn
            </a>
            <a href="https://youtube.com/@buildfromcode" target="_blank" rel="noopener noreferrer" className="btn">
              YouTube
            </a>
            <a href="mailto:sujanroydev+portfolio@gmail.com" className="btn">
              Email
            </a>
          </div>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
