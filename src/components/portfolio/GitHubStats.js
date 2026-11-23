import Image from "next/image";
import Reveal from "./Reveal";

const stats = [
  {
    src: "https://streak-stats.demolab.com/?user=sujanroydev&theme=tokyonight&hide_border=true&cache_seconds=1800",
    alt: "GitHub Streak",
    height: 300,
  },
  {
    src: "https://github-readme-activity-graph.vercel.app/graph?username=sujanroydev&theme=tokyo-night&hide_border=true",
    alt: "GitHub Contribution Graph",
    height: 400,
  },
];

export default function GitHubStats() {
  return (
    <Reveal as="section" id="github" className="section">
      <h2>GitHub Stats</h2>
      <div className="github-stats">
        {stats.map((stat) => (
          <Image
            key={stat.alt}
            src={stat.src}
            alt={stat.alt}
            width={1100}
            height={stat.height}
            unoptimized
            loading="lazy"
          />
        ))}
      </div>
    </Reveal>
  );
}
