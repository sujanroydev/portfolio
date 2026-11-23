import Image from "next/image";
import { education } from "../../data/portfolio";
import Reveal from "./Reveal";

export default function About() {
  return (
    <Reveal as="section" id="about" className="section">
      <h2>About Me</h2>
      <p className="content-text">
        I’m Sujan Kumar Roy, a BCA student who builds practical web applications
        focused on solving real-world problems.
      </p>
      <p className="content-text">
        I’ve developed projects like Knowlet (an educational platform), Land
        Calculator (a high-precision land area tool), and Rongpur Daily Needs (a
        modern e-commerce interface). I work with JavaScript, SQL, and modern
        web technologies to build clean, efficient, and user-focused solutions.
      </p>

      <h3 className="education-title">Education</h3>
      <div className="timeline">
        {education.map((item) => (
          <article className="timeline-item" key={item.school}>
            <Image
              src={item.image}
              alt={item.alt}
              className="edu-logo"
              width={60}
              height={60}
            />
            <div className="edu-text">
              <h3>{item.school}</h3>
              <p>{item.qualification}</p>
            </div>
          </article>
        ))}
      </div>
    </Reveal>
  );
}
