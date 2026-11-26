import Link from "next/link";

const pages = [
  {
    title: "Questions",
    description: "A few questions to answer.",
    href: "/unsaid/questions",
    icon: "💭",
  },
  {
    title: "Love",
    description: "A little question from my heart.",
    href: "/unsaid/love",
    icon: "❤️",
  },
  {
    title: "A Sky Full of Her",
    description: "Discover little memories hidden among the stars.",
    href: "/unsaid/constellation",
    icon: "✦",
  },
  {
    title: "Feelings",
    description: "Everything I've been feeling but couldn't say.",
    href: "/unsaid/feelings",
    icon: "🥀",
  },
  {
    title: "Letter",
    description: "Some words written for you.",
    href: "/unsaid/letter",
    icon: "💌",
  },
  // {
  //   title: "Memories",
  //   description: "A collection of moments.",
  //   href: "/unsaid/memories",
  //   icon: "📸",
  // },
  {
    title: "Reasons",
    description: "A few things I appreciate.",
    href: "/unsaid/reasons",
    icon: "🌷",
  },
  {
    title: "Surprise",
    description: "Something special awaits.",
    href: "/unsaid/surprise",
    icon: "🎁",
  },
  {
    title: "If...",
    description: "Some interesting what-ifs.",
    href: "/unsaid/if",
    icon: "✨",
  },
  {
    title: "Memory Roulette",
    description: "Let a random little moment find you.",
    href: "/unsaid/roulette",
    icon: "🎲",
  },
  {
    title: "Open When",
    description: "Letters for different moments.",
    href: "/unsaid/open-when",
    icon: "✉️",
  },
  {
    title: "Diary",
    description: "A few thoughts from my diary.",
    href: "/unsaid/diary",
    icon: "📖",
  },
  {
    title: "Jar of Hearts",
    description: "Little notes, one at a time.",
    href: "/unsaid/jar",
    icon: "🫙",
  },
  // {
  //   title: "Scrapbook",
  //   description: "A little collection of pictures.",
  //   href: "/unsaid/scrapbook",
  //   icon: "🖼️",
  // },
  {
    title: "Secret",
    description: "A little secret to discover.",
    href: "/unsaid/secret",
    icon: "🔐",
  },
  {
    title: "Through My Eyes",
    description: "A little world of photographs and animations.",
    href: "/unsaid/gallery",
    icon: "📷",
  },
  // {
  //   title: "Songs",
  //   description: "Songs with special meanings.",
  //   href: "/unsaid/songs",
  //   icon: "🎵",
  // },
  {
    title: "This or That",
    description: "Choose between two things.",
    href: "/unsaid/this-or-that",
    icon: "⚖️",
  },
  {
    title: "Countdown",
    description: "A moment worth waiting for.",
    href: "/unsaid/time",
    icon: "⏳",
  },
  {
    title: "Universe",
    description: "Discover the hidden stars.",
    href: "/unsaid/universe",
    icon: "🌌",
  },
  {
    title: "Make a Wish",
    description: "Write a wish and let it go.",
    href: "/unsaid/wish",
    icon: "⭐",
  },
];

export default function PagesDirectory() {
  return (
    <main className="min-h-screen bg-[#0d0d0d] px-5 py-16 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/unsaid"
          className="mb-10 inline-flex items-center gap-2 text-sm text-pink-300 transition hover:text-pink-200"
        >
          ← Back to home
        </Link>

        <header className="mb-10 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.4em] text-pink-300">
            A little collection
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Explore <span className="text-pink-300">Everything</span>
          </h1>
          <p className="mt-4 text-sm text-white/50">
            Choose a page and explore it at your own pace.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pages.map((page, index) => (
            <Link
              key={page.href}
              href={page.href}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition duration-300 hover:-translate-y-1 hover:border-pink-300/40 hover:bg-pink-300/[0.06]"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="text-3xl">{page.icon}</span>
                <span className="text-xs text-white/30">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h2 className="text-lg font-medium text-white transition group-hover:text-pink-300">
                {page.title}
              </h2>
              <p className="mt-2 text-sm text-white/50">{page.description}</p>
              <p className="mt-5 text-xs text-pink-300/70">Explore page →</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
