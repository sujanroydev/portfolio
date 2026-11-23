import Reveal from "./Reveal";
import { projects } from "../../data/portfolio";

export default function Projects() {
  return (
    <Reveal as="section" id="projects" className="section projects-container">
      <h2>Web Projects</h2>
      <div className="project-grid">
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
            <div className="project-meta">
              <h3>{project.name}</h3>
              <p>{project.description}</p>
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
                className="view-btn"
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
