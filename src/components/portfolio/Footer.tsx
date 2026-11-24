export default function Footer() {
  return (
    <footer id="social-links" className="border-t border-white/[0.08] bg-[#0d0d0d] text-white">
      <div className="mx-auto max-w-[1200px] px-[22px] py-10 md:py-12">
        <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <h2 className="mb-1 text-xl font-semibold">Find me online</h2>
            <p className="m-0 text-sm text-white/55">Follow along or get in touch.</p>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3" aria-label="Social links">
            <a
              className="text-sm text-white/75 underline decoration-transparent underline-offset-4 transition-colors hover:text-accent hover:decoration-accent focus-visible:text-accent"
              href="https://github.com/sujanroydev"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              className="text-sm text-white/75 underline decoration-transparent underline-offset-4 transition-colors hover:text-accent hover:decoration-accent focus-visible:text-accent"
              href="https://linkedin.com/in/sujanroydev"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="text-sm text-white/75 underline decoration-transparent underline-offset-4 transition-colors hover:text-accent hover:decoration-accent focus-visible:text-accent"
              href="https://youtube.com/@buildfromcode"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube
            </a>
            <a
              className="text-sm text-white/75 underline decoration-transparent underline-offset-4 transition-colors hover:text-accent hover:decoration-accent focus-visible:text-accent"
              href="mailto:sujanroydev+portfolio@gmail.com"
            >
              Email
            </a>
          </nav>
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/[0.08] pt-5 text-xs text-white/45 sm:flex-row">
          <p className="m-0">© 2026 Sujan Kumar Roy</p>
          <a className="transition-colors hover:text-accent" href="#home">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
