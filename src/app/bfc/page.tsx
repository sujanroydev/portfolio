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
    <div className="relative isolate min-h-screen overflow-x-hidden scroll-smooth bg-[radial-gradient(circle_at_18%_8%,rgba(255,61,90,0.3),transparent_30rem),radial-gradient(circle_at_82%_0%,rgba(34,211,238,0.22),transparent_30rem),linear-gradient(135deg,#070914_0%,#111827_48%,#09090f_100%)] [font-family:var(--font-inter),ui-sans-serif,system-ui,sans-serif] text-[#f8fafc] before:fixed before:inset-0 before:-z-10 before:bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] before:bg-[size:54px_54px] before:opacity-[0.28] before:[mask-image:linear-gradient(to_bottom,#000,transparent_82%)] before:content-[''] after:fixed after:inset-[auto_8%_8%_auto] after:-z-10 after:size-72 after:rounded-full after:bg-[rgba(124,58,237,0.22)] after:blur-[70px] after:content-['']">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/[0.12] bg-[#070914]/[0.72] px-[clamp(20px,5vw,72px)] py-[18px] backdrop-blur-[18px] max-[720px]:flex-col max-[720px]:items-start max-[720px]:gap-[14px]">
        <div className="relative text-[1.1rem] font-black tracking-[0.04em] before:mr-[10px] before:content-['</>'] before:text-[#22d3ee]">
          BuildFromCode
        </div>
        <nav
          className="flex gap-[clamp(12px,2vw,28px)] max-[720px]:w-full max-[720px]:flex-wrap"
          aria-label="BuildFromCode"
        >
          <a className="relative text-[0.95rem] font-bold text-[#dbeafe] no-underline after:absolute after:-bottom-[7px] after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-[linear-gradient(90deg,#ff3d5a,#22d3ee)] after:transition-[width] after:duration-250 hover:after:w-full" href="#about">About</a>
          <a className="relative text-[0.95rem] font-bold text-[#dbeafe] no-underline after:absolute after:-bottom-[7px] after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-[linear-gradient(90deg,#ff3d5a,#22d3ee)] after:transition-[width] after:duration-250 hover:after:w-full" href="#content">Content</a>
          <a className="relative text-[0.95rem] font-bold text-[#dbeafe] no-underline after:absolute after:-bottom-[7px] after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-[linear-gradient(90deg,#ff3d5a,#22d3ee)] after:transition-[width] after:duration-250 hover:after:w-full" href="#projects">Projects</a>
          <a className="relative text-[0.95rem] font-bold text-[#dbeafe] no-underline after:absolute after:-bottom-[7px] after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-[linear-gradient(90deg,#ff3d5a,#22d3ee)] after:transition-[width] after:duration-250 hover:after:w-full" href="#contact">Connect</a>
        </nav>
      </header>

      <main>
        <section className="relative grid min-h-[92vh] place-items-center px-5 pb-[90px] pt-[130px] text-center before:absolute before:inset-[12%_9%] before:rotate-[-1deg] before:rounded-[40px] before:border before:border-white/10 before:bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] before:shadow-[0_24px_70px_rgba(0,0,0,0.35)] before:content-[''] max-[720px]:pt-[100px]">
          <div className="relative max-w-[980px]">
            <h1 className="text-[clamp(3rem,8vw,7.6rem)] leading-[0.94] tracking-[-0.07em] [text-wrap:balance]">
              <span className="bg-gradient-to-r from-white via-[#93c5fd] to-[#22d3ee] bg-clip-text text-transparent">
                Build Real Apps.
              </span>
              <br />
              Not Just Tutorials.
            </h1>
            <p className="mx-auto mt-7 max-w-[700px] text-[clamp(1rem,2vw,1.28rem)] text-[#a7b0c2]">
              A developer-focused YouTube channel where every video turns into
              a real project: from idea → code → deployment.
            </p>
            <div className="mt-[34px]">
              <a
                href="https://www.youtube.com/@BuildFromCode"
                target="_blank"
                rel="noopener noreferrer"
                className="m-2 inline-flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#ff3d5a,#f97316)] px-[22px] py-[13px] font-extrabold text-white no-underline shadow-[0_16px_40px_rgba(255,61,90,0.28)] transition duration-250 hover:-translate-y-[3px] hover:shadow-[0_20px_50px_rgba(249,115,22,0.34)]"
              >
                ▶ Watch YouTube
              </a>
              <a
                href="#projects"
                className="m-2 inline-flex min-h-12 items-center justify-center rounded-full border border-white/[0.18] bg-white/[0.07] px-[22px] py-[13px] font-extrabold text-white no-underline transition duration-250 hover:-translate-y-[3px] hover:border-[#22d3ee]/65"
              >
                Explore Projects
              </a>
            </div>
            <div className="mx-auto mt-14 grid max-w-[680px] grid-cols-[repeat(3,minmax(120px,1fr))] gap-4 max-[720px]:grid-cols-1">
              <div className="rounded-[22px] border border-white/[0.12] bg-white/[0.075] p-5 backdrop-blur-2xl">
                <h3 className="text-[clamp(1.4rem,3vw,2rem)]">10+</h3>
                <p className="mt-[5px] text-[0.88rem]">Projects</p>
              </div>
              <div className="rounded-[22px] border border-white/[0.12] bg-white/[0.075] p-5 backdrop-blur-2xl">
                <h3 className="text-[clamp(1.4rem,3vw,2rem)]">Frontend</h3>
                <p className="mt-[5px] text-[0.88rem]">Focused</p>
              </div>
              <div className="rounded-[22px] border border-white/[0.12] bg-white/[0.075] p-5 backdrop-blur-2xl">
                <h3 className="text-[clamp(1.4rem,3vw,2rem)]">Real</h3>
                <p className="mt-[5px] text-[0.88rem]">Builds</p>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="px-5 py-[105px] text-center">
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] leading-none tracking-[-0.04em]">Why BuildFromCode?</h2>
          <p className="mx-auto mb-[42px] mt-[18px] max-w-[640px] text-[1.05rem] text-[#a7b0c2]">
            Most tutorials teach syntax. This channel teaches thinking.
          </p>
          <div className="mx-auto grid max-w-[1120px] grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-[22px]">
            <Reveal as="article" className="group relative overflow-hidden rounded-[26px] border border-white/[0.12] bg-white/[0.075] p-[30px] shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-[18px] transition duration-300 hover:-translate-y-2 hover:border-[#22d3ee]/[0.42] hover:bg-white/[0.12] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.2),transparent_55%)] before:opacity-0 before:transition-opacity before:duration-250 before:content-[''] hover:before:opacity-100">
              <h3 className="relative mb-3 text-[1.28rem]">Project First</h3>
              <p className="relative text-[#a7b0c2]">You learn by building apps people actually use.</p>
            </Reveal>
            <Reveal as="article" className="group relative overflow-hidden rounded-[26px] border border-white/[0.12] bg-white/[0.075] p-[30px] shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-[18px] transition duration-300 hover:-translate-y-2 hover:border-[#22d3ee]/[0.42] hover:bg-white/[0.12] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.2),transparent_55%)] before:opacity-0 before:transition-opacity before:duration-250 before:content-[''] hover:before:opacity-100">
              <h3 className="relative mb-3 text-[1.28rem]">No Fluff</h3>
              <p className="relative text-[#a7b0c2]">Only practical coding, no unnecessary theory dumps.</p>
            </Reveal>
            <Reveal as="article" className="group relative overflow-hidden rounded-[26px] border border-white/[0.12] bg-white/[0.075] p-[30px] shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-[18px] transition duration-300 hover:-translate-y-2 hover:border-[#22d3ee]/[0.42] hover:bg-white/[0.12] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.2),transparent_55%)] before:opacity-0 before:transition-opacity before:duration-250 before:content-[''] hover:before:opacity-100">
              <h3 className="relative mb-3 text-[1.28rem]">Modern Stack</h3>
              <p className="relative text-[#a7b0c2]">HTML, CSS, JS, APIs, PWA, and real deployment.</p>
            </Reveal>
          </div>
        </section>

        <section id="content" className="relative overflow-hidden border-y border-white/[0.12] bg-[rgba(2,6,23,0.55)] px-5 py-[105px] text-center">
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] leading-none tracking-[-0.04em]">What You’ll See Here</h2>
          <div className="mx-auto mt-11 max-w-[760px] text-left [counter-reset:steps]">
            <div className="relative my-[18px] rounded-[20px] border border-white/[0.12] bg-white/[0.055] py-[22px] pl-[72px] pr-6 text-[#d9e4f5] before:absolute before:left-[22px] before:top-1/2 before:grid before:size-8 before:-translate-y-1/2 before:place-items-center before:rounded-full before:bg-[linear-gradient(135deg,#22d3ee,#a7f3d0)] before:font-black before:text-[#020617] before:[counter-increment:steps] before:[content:counter(steps)]">💡 Idea breakdown → how apps are planned</div>
            <div className="relative my-[18px] rounded-[20px] border border-white/[0.12] bg-white/[0.055] py-[22px] pl-[72px] pr-6 text-[#d9e4f5] before:absolute before:left-[22px] before:top-1/2 before:grid before:size-8 before:-translate-y-1/2 before:place-items-center before:rounded-full before:bg-[linear-gradient(135deg,#22d3ee,#a7f3d0)] before:font-black before:text-[#020617] before:[counter-increment:steps] before:[content:counter(steps)]">🧠 Logic building → how features work internally</div>
            <div className="relative my-[18px] rounded-[20px] border border-white/[0.12] bg-white/[0.055] py-[22px] pl-[72px] pr-6 text-[#d9e4f5] before:absolute before:left-[22px] before:top-1/2 before:grid before:size-8 before:-translate-y-1/2 before:place-items-center before:rounded-full before:bg-[linear-gradient(135deg,#22d3ee,#a7f3d0)] before:font-black before:text-[#020617] before:[counter-increment:steps] before:[content:counter(steps)]">⚙️ Coding → step-by-step implementation</div>
            <div className="relative my-[18px] rounded-[20px] border border-white/[0.12] bg-white/[0.055] py-[22px] pl-[72px] pr-6 text-[#d9e4f5] before:absolute before:left-[22px] before:top-1/2 before:grid before:size-8 before:-translate-y-1/2 before:place-items-center before:rounded-full before:bg-[linear-gradient(135deg,#22d3ee,#a7f3d0)] before:font-black before:text-[#020617] before:[counter-increment:steps] before:[content:counter(steps)]">🚀 Deployment → real-world hosting</div>
          </div>
        </section>

        <section id="projects" className="px-5 py-[105px] text-center">
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] leading-none tracking-[-0.04em]">Featured Builds</h2>
          <div className="mx-auto mt-[42px] grid max-w-[1120px] grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-[22px]">
            <Reveal as="article" className="group relative min-h-[180px] overflow-hidden rounded-[26px] border border-white/[0.12] bg-white/[0.075] p-[30px] text-left shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-[18px] transition duration-300 hover:-translate-y-2 hover:border-[#22d3ee]/[0.42] hover:bg-white/[0.12] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.2),transparent_55%)] before:opacity-0 before:transition-opacity before:duration-250 before:content-[''] hover:before:opacity-100">
              <h3 className="relative mb-3 text-[1.28rem] after:mt-[14px] after:block after:h-[3px] after:w-[42px] after:rounded-full after:bg-[linear-gradient(90deg,#ff3d5a,#22d3ee)] after:content-['']">Todo App</h3>
              <p className="relative text-[#a7b0c2]">Local storage based task manager with clean UI.</p>
            </Reveal>
            <Reveal as="article" className="group relative min-h-[180px] overflow-hidden rounded-[26px] border border-white/[0.12] bg-white/[0.075] p-[30px] text-left shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-[18px] transition duration-300 hover:-translate-y-2 hover:border-[#22d3ee]/[0.42] hover:bg-white/[0.12] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.2),transparent_55%)] before:opacity-0 before:transition-opacity before:duration-250 before:content-[''] hover:before:opacity-100">
              <h3 className="relative mb-3 text-[1.28rem] after:mt-[14px] after:block after:h-[3px] after:w-[42px] after:rounded-full after:bg-[linear-gradient(90deg,#ff3d5a,#22d3ee)] after:content-['']">Push System</h3>
              <p className="relative text-[#a7b0c2]">Browser notifications using service workers.</p>
            </Reveal>
            <Reveal as="article" className="group relative min-h-[180px] overflow-hidden rounded-[26px] border border-white/[0.12] bg-white/[0.075] p-[30px] text-left shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-[18px] transition duration-300 hover:-translate-y-2 hover:border-[#22d3ee]/[0.42] hover:bg-white/[0.12] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.2),transparent_55%)] before:opacity-0 before:transition-opacity before:duration-250 before:content-[''] hover:before:opacity-100">
              <h3 className="relative mb-3 text-[1.28rem] after:mt-[14px] after:block after:h-[3px] after:w-[42px] after:rounded-full after:bg-[linear-gradient(90deg,#ff3d5a,#22d3ee)] after:content-['']">PWA Installable App</h3>
              <p className="relative text-[#a7b0c2]">Offline-ready web app like mobile apps.</p>
            </Reveal>
            <Reveal as="article" className="group relative min-h-[180px] overflow-hidden rounded-[26px] border border-white/[0.12] bg-white/[0.075] p-[30px] text-left shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-[18px] transition duration-300 hover:-translate-y-2 hover:border-[#22d3ee]/[0.42] hover:bg-white/[0.12] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.2),transparent_55%)] before:opacity-0 before:transition-opacity before:duration-250 before:content-[''] hover:before:opacity-100">
              <h3 className="relative mb-3 text-[1.28rem] after:mt-[14px] after:block after:h-[3px] after:w-[42px] after:rounded-full after:bg-[linear-gradient(90deg,#ff3d5a,#22d3ee)] after:content-['']">Dark Mode Engine</h3>
              <p className="relative text-[#a7b0c2]">Theme system using CSS variables + JS.</p>
            </Reveal>
          </div>
        </section>

        <section id="contact" className="relative overflow-hidden bg-[radial-gradient(circle_at_25%_30%,rgba(255,255,255,0.22),transparent_18rem),linear-gradient(100deg,#ff3d5a,#7c3aed_55%,#0891b2)] px-5 py-[105px] text-center">
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] leading-none tracking-[-0.04em]">Start Building With Me</h2>
          <p className="mx-auto mb-5 mt-4 max-w-[560px] text-white/[0.84]">Subscribe and follow along as real apps are built from scratch.</p>
          <a
            className="m-2 inline-flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#ff3d5a,#f97316)] px-[22px] py-[13px] font-extrabold text-white no-underline shadow-[0_16px_40px_rgba(255,61,90,0.28)] transition duration-250 hover:-translate-y-[3px] hover:shadow-[0_20px_50px_rgba(249,115,22,0.34)]"
            href="https://www.youtube.com/@BuildFromCode"
            target="_blank"
            rel="noopener noreferrer"
          >
            Subscribe Now
          </a>
        </section>
      </main>

      <footer className="border-t border-white/[0.12] bg-[rgba(2,6,23,0.86)] px-5 py-[34px] text-center text-[#94a3b8]">
        <p>© <CurrentYear /> BuildFromCode • Built for developers</p>
      </footer>
    </div>
  );
}
