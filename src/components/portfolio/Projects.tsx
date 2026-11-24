import Reveal from "./Reveal";
import { projects } from "../../data/portfolio";

export default function Projects() {
  return (
    <Reveal
      as="section"
      id="projects"
      className="mx-auto max-w-[1200px] scroll-mt-[70px] px-5 py-20 text-center"
    >
      <h2 className="mb-[30px] text-[1.9rem] text-accent md:text-[2.2rem]">Web Projects</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-[30px] max-[480px]:grid-cols-[minmax(0,1fr)]">
        {projects.map((project) => (
          <article
            className="overflow-hidden rounded-xl border border-white/10 bg-white/5 text-left transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-2 hover:border-accent hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            key={project.name}
          >
            <div className="flex gap-1.5 border-b border-white/10 bg-white/[0.08] p-3" aria-hidden="true">
              <span className="size-2 rounded-full bg-white/30" />
              <span className="size-2 rounded-full bg-white/30" />
              <span className="size-2 rounded-full bg-white/30" />
            </div>
            <div className="relative h-[220px] w-full overflow-hidden bg-[#1a1a1a]">
              <iframe
                src={project.url}
                title={`${project.name} website preview`}
                tabIndex={-1}
                loading="lazy"
                className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[1280px] -translate-x-1/2 -translate-y-1/2 scale-[0.25] border-0"
              />
            </div>
            <div className="p-5">
              <h3 className="mb-2 text-[1.25rem] text-white">{project.name}</h3>
              <p className="mb-[15px] text-[0.9rem] text-white/70">{project.description}</p>
              <div className="my-4 mb-[18px] flex flex-wrap gap-2.5">
                {project.technologies.map(([technology, icon]) => (
                  <span
                    className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/5 px-3 py-[7px] text-[0.82rem] font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-accent/[0.08] hover:shadow-[0_8px_18px_rgba(77,242,201,0.12)]"
                    key={technology}
                  >
                    <i className={`${icon} colored text-base`} aria-hidden="true" />
                    {technology}
                  </span>
                ))}
              </div>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[0.85rem] font-semibold uppercase tracking-[1px] text-accent no-underline hover:underline"
              >
                Launch Site →
              </a>
            </div>
          </article>
        ))}
      </div>
    </Reveal>
  );
}
