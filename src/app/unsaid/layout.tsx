import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "A Little Something For You ❤️",
  description: "A personal message made with love.",
  alternates: {
    canonical: "/unsaid",
  },
  openGraph: {
    title: "A Little Something For You ❤️",
    description: "A personal message made with love.",
    url: "https://sujanroy.in/unsaid",
    siteName: "Sujan Kumar Roy",
    type: "website",
  },
};

interface ForYouLayoutProps {
  children: ReactNode;
}

export default function ForYouLayout({ children }: ForYouLayoutProps) {
  return children;
}
