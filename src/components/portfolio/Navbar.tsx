"use client";

import { useEffect, useState } from "react";

const links = [
  ["home", "Home"],
  ["about", "About"],
  ["skills", "Skills"],
  ["projects", "Projects"],
  ["contact", "Contact"],
] as const;

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateActiveSection = () => {
      let current = "home";
      document.querySelectorAll<HTMLElement>("main > header[id], main > section[id]").forEach((section) => {
        if (window.scrollY >= section.offsetTop - 150) {
          current = section.id;
        }
      });
      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveSection);
  }, []);

  return (
    <nav
      className="sticky top-0 z-[100] flex items-center justify-between border-b border-white/[0.08] bg-[rgba(15,15,15,0.85)] px-6 py-4 backdrop-blur-[14px] max-md:flex-wrap max-md:px-5 max-md:py-[14px]"
      aria-label="Main navigation"
    >
      <a
        href="#home"
        className="text-[1.2rem] font-bold text-accent no-underline"
        onClick={() => setMenuOpen(false)}
      >
        SKR
      </a>
      <button
        className="hidden size-10 cursor-pointer flex-col items-center justify-center gap-[5px] rounded-lg border border-glass-border bg-glass-bg max-md:flex"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className="h-0.5 w-[18px] rounded-sm bg-white" />
        <span className="h-0.5 w-[18px] rounded-sm bg-white" />
        <span className="h-0.5 w-[18px] rounded-sm bg-white" />
      </button>
      <ul
        id="primary-navigation"
        className={`${menuOpen ? "flex" : "hidden"} m-0 w-full list-none flex-col gap-0 p-0 pt-2 md:flex md:w-auto md:flex-row md:gap-[18px] md:pt-0`}
      >
        {links.map(([id, label]) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`block py-2.5 text-[0.95rem] text-white no-underline transition-colors duration-300 hover:text-accent md:py-0 ${
                activeSection === id ? "text-accent" : ""
              }`}
              aria-current={activeSection === id ? "location" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
