import Image from "next/image";
import { skillGroups } from "../../data/portfolio";
import Reveal from "./Reveal";

export default function Skills() {
  return (
    <Reveal
      as="section"
      id="skills"
      className="mx-auto max-w-[1200px] scroll-mt-[70px] px-[22px] py-[90px] text-center"
    >
      <h2 className="mb-[30px] text-[1.9rem] text-accent md:text-[2.2rem]">Technical Skills</h2>
      {skillGroups.map((group) => (
        <div key={group.title}>
          <h3 className="my-[25px] mb-5 text-accent">{group.title}</h3>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-5">
            {group.skills.map(([name, icon]) => (
              <div
                className="skill-card flex flex-col items-center justify-center gap-2.5 p-5 text-center"
                key={name}
              >
                {icon.startsWith("/") ? (
                  <Image src={icon} alt="" width={40} height={40} className="h-10 w-10 object-contain" />
                ) : (
                  <i className={`${icon} colored text-[40px]`} aria-hidden="true" />
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
