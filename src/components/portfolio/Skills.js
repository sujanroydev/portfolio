import Image from "next/image";
import { skillGroups } from "../../data/portfolio";
import Reveal from "./Reveal";

export default function Skills() {
  return (
    <Reveal as="section" id="skills" className="section">
      <h2>Technical Skills</h2>
      {skillGroups.map((group) => (
        <div key={group.title}>
          <h3 className="skill-title">{group.title}</h3>
          <div className="skill-grid">
            {group.skills.map(([name, icon]) => (
              <div className="skill-card" key={name}>
                {icon.startsWith("/") ? (
                  <Image src={icon} alt="" width={40} height={40} />
                ) : (
                  <i className={`${icon} colored`} aria-hidden="true" />
                )}
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </Reveal>
  );
}
