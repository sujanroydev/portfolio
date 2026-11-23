"use client";

export default function ContactForm() {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const message = String(formData.get("message") || "").trim();
    if (!name || !message) return;

    const subject = encodeURIComponent(`Portfolio Message from ${name}`);
    const body = encodeURIComponent(message);
    window.location.href = `mailto:sujanroydev+portfolio@gmail.com?subject=${subject}&body=${body}`;
  }

  return (
    <form id="contact-form" onSubmit={handleSubmit}>
      <label className="visually-hidden" htmlFor="contact-name">
        Your Name
      </label>
      <input
        type="text"
        id="contact-name"
        name="name"
        placeholder="Your Name"
        autoComplete="name"
        required
      />
      <label className="visually-hidden" htmlFor="contact-message">
        Your Message
      </label>
      <textarea
        id="contact-message"
        name="message"
        placeholder="Your Message"
        required
      />
      <button type="submit">Send Email</button>
    </form>
  );
}
