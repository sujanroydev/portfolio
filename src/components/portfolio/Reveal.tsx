"use client";

import { useEffect, useState } from "react";
import type { ReactElement, ReactNode, RefCallback } from "react";

type RevealTag = "article" | "div" | "header" | "section";

interface RevealProps {
  as?: RevealTag;
  className?: string;
  children: ReactNode;
  id?: string;
}

export default function Reveal({
  as: Element = "div",
  className = "",
  children,
  id,
}: RevealProps): ReactElement {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const setObservedNode: RefCallback<HTMLElement> = (element) => setNode(element);

  useEffect(() => {
    if (!node) return;
    if (typeof window.IntersectionObserver === "undefined") {
      const frame = window.requestAnimationFrame(() => setVisible(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [node]);

  return (
    <Element
      ref={setObservedNode}
      className={`${className} fade-in${visible ? " show" : ""}`.trim()}
      id={id}
    >
      {children}
    </Element>
  );
}
