import Image from "next/image";
import Reveal from "./Reveal";
import TypingName from "./TypingName";

export default function Hero() {
  return (
    <Reveal
      as="header"
      id="home"
      className="flex min-h-screen flex-col items-center justify-center px-5 pb-[70px] pt-[120px] text-center"
    >
      <Image
        src="/sujan-roy-512x512.png"
        alt="Sujan Kumar Roy"
        width={160}
        height={160}
        priority
        className="mb-[18px] rounded-full border-4 border-accent object-cover shadow-[0_0_25px_rgba(77,242,201,0.5)]"
      />
      <h1 className="mb-[10px] text-[2rem] md:text-[2.5rem]">
        <span className="sr-only">Sujan Kumar Roy</span>
        <span id="typing-text" aria-hidden="true">
          <TypingName />
        </span>
      </h1>
      <p className="mb-[25px] text-[1.1rem] opacity-[0.85]">
        Web Developer • Tech Explorer • BCA Student
      </p>
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
