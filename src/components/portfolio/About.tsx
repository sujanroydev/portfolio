import Image from "next/image";
import { education } from "../../data/portfolio";
import Reveal from "./Reveal";

export default function About() {
  return (
    <Reveal
      as="section"
      id="about"
      className="mx-auto max-w-[1200px] scroll-mt-[70px] px-[22px] py-[90px] text-center"
    >
      <h2 className="mb-[30px] text-[1.9rem] text-accent md:text-[2.2rem]">About Me</h2>
      <p className="mx-auto mb-[18px] max-w-[760px] text-[1.05rem] opacity-90">
        I’m Sujan Kumar Roy, a BCA student who builds practical web applications
        focused on solving real-world problems.
      </p>
      <p className="mx-auto mb-[18px] max-w-[760px] text-[1.05rem] opacity-90">
        I’ve developed projects like Knowlet (an educational platform), Land
        Calculator (a high-precision land area tool), and Rongpur Daily Needs (a
        modern e-commerce interface). I work with JavaScript, SQL, and modern
        web technologies to build clean, efficient, and user-focused solutions.
      </p>

      <h3 className="mb-5 mt-10 text-accent">Education</h3>
      <div className="mx-auto grid max-w-[720px] gap-[25px]">
        {education.map((item) => (
          <article
            className="flex items-center gap-5 rounded-2xl border border-glass-border border-l-4 border-l-accent bg-glass-bg p-[25px] text-left backdrop-blur-[15px] transition duration-300 hover:-translate-y-1.5 hover:bg-white/10 max-[480px]:flex-col max-[480px]:items-start max-[480px]:gap-[15px]"
            key={item.school}
          >
            <Image
              src={item.image}
              alt={item.alt}
              className="h-[60px] w-[60px] shrink-0 rounded-lg bg-white object-contain p-[5px]"
              width={60}
              height={60}
            />
            <div>
              <h3 className="mb-[5px] text-[1.15rem]">{item.school}</h3>
              <p className="text-[0.95rem] opacity-[0.85]">{item.qualification}</p>
            </div>
          </article>
        ))}
      </div>
    </Reveal>
  );
}
