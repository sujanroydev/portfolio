import Image from "next/image";
import Reveal from "./Reveal";
import TypingName from "./TypingName";

export default function Hero() {
  return (
    <Reveal as="header" id="home">
      <Image
        src="/sujan-roy-512x512.png"
        alt="Sujan Kumar Roy"
        width={160}
        height={160}
        priority
      />
      <h1>
        <span className="visually-hidden">Sujan Kumar Roy</span>
        <span id="typing-text" aria-hidden="true">
          <TypingName />
        </span>
      </h1>
      <p>Web Developer • Tech Explorer • BCA Student</p>
      <div>
        <a href="#projects" className="btn">
          View Projects
        </a>
        <a href="#contact" className="btn">
          Contact Me
        </a>
      </div>
    </Reveal>
  );
}
