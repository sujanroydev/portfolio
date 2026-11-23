import Reveal from "./Reveal";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <Reveal as="section" id="contact" className="section">
      <h2>Contact Me</h2>
      <ContactForm />
    </Reveal>
  );
}
