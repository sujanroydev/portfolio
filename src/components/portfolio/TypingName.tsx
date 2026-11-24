"use client";

import { useEffect, useState } from "react";

export default function TypingName() {
  const [name, setName] = useState("");

  useEffect(() => {
    const fullName = "Sujan Kumar Roy";
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setName(fullName.slice(0, index));
      if (index >= fullName.length) window.clearInterval(timer);
    }, 120);
    return () => window.clearInterval(timer);
  }, []);

  return <>{name}</>;
}
