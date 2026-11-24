import About from "../components/portfolio/About";
import Contact from "../components/portfolio/Contact";
import Footer from "../components/portfolio/Footer";
import GitHubStats from "../components/portfolio/GitHubStats";
import Hero from "../components/portfolio/Hero";
import Navbar from "../components/portfolio/Navbar";
import Projects from "../components/portfolio/Projects";
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
      </main>
      <Footer />
    </>
  );
}
