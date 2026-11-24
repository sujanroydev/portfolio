"use client";

import type { FormEvent } from "react";

export default function ContactForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
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
    <form
      id="contact-form"
      onSubmit={handleSubmit}
      className="mx-auto mb-10 flex max-w-[420px] flex-col gap-4"
    >
      <label className="sr-only" htmlFor="contact-name">
        Your Name
      </label>
      <input
        type="text"
        id="contact-name"
        name="name"
        placeholder="Your Name"
        autoComplete="name"
        required
        className="rounded-xl border border-glass-border bg-glass-bg p-[14px] text-base text-white"
      />
      <label className="sr-only" htmlFor="contact-message">
        Your Message
      </label>
      <textarea
        id="contact-message"
        name="message"
        placeholder="Your Message"
        required
        className="min-h-[120px] resize-y rounded-xl border border-glass-border bg-glass-bg p-[14px] text-base text-white"
      />
      <button
        type="submit"
        className="cursor-pointer rounded-xl border-0 bg-accent p-[14px] font-bold text-black hover:bg-[#39dcaf]"
      >
        Send Email
      </button>
    </form>
  );
}
