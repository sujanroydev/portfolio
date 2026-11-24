import Reveal from "./Reveal";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <Reveal
      as="section"
      id="contact"
      className="mx-auto max-w-[1200px] scroll-mt-[70px] px-[22px] py-[90px] text-center"
    >
      <h2 className="mb-[30px] text-[1.9rem] text-accent md:text-[2.2rem]">Contact Me</h2>
      <ContactForm />
    </Reveal>
  );
}
