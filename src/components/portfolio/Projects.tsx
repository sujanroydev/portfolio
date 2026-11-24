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
          <article className="browser-window" key={project.name}>
            <div className="browser-header" aria-hidden="true">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </div>
            <div className="preview-viewport">
              <iframe
                src={project.url}
                title={`${project.name} website preview`}
                tabIndex={-1}
                loading="lazy"
              />
            </div>
            <div className="p-5">
              <h3 className="mb-2 text-[1.25rem] text-white">{project.name}</h3>
              <p className="mb-[15px] text-[0.9rem] text-white/70">{project.description}</p>
              <div className="tech-stack">
                {project.technologies.map(([technology, icon]) => (
                  <span key={technology}>
                    <i className={`${icon} colored`} aria-hidden="true" />
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
