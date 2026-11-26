"use client";

import { useEffect, useRef, useState } from "react";

type LazyImageProps = {
  src: string;
  alt: string;
  className?: string;
};

export default function LazyImage({ src, alt, className }: LazyImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "300px",
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-[#d7c5ca]" />
      )}

      {shouldLoad && (
        <img
          src={src}
          alt={alt}
          loading="eager"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
          className={`${className ?? ""} transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}
