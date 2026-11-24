import "./globals.css";
import { Inter, Poppins } from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sujanroy.in"),
  title: "Sujan Kumar Roy | Portfolio",
  description:
    "Portfolio of Sujan Kumar Roy, BCA student and aspiring data scientist.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sujan Kumar Roy | Portfolio",
    description:
      "Portfolio of Sujan Kumar Roy, BCA student and aspiring data scientist.",
    url: "https://sujanroy.in/",
    siteName: "Sujan Kumar Roy",
    type: "website",
    images: ["/sujan-roy-512x512.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body className={`${inter.variable} ${poppins.variable}`}>{children}</body>
    </html>
  );
}
