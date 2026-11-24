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
    <Reveal
      as="section"
      id="github"
      className="mx-auto max-w-[1200px] scroll-mt-[70px] px-[22px] py-[90px] text-center"
    >
      <h2 className="mb-[30px] text-[1.9rem] text-accent md:text-[2.2rem]">GitHub Stats</h2>
      <div className="mx-auto max-w-[1100px]">
        {stats.map((stat) => (
          <Image
            key={stat.alt}
            src={stat.src}
            alt={stat.alt}
            width={1100}
            height={stat.height}
            className="mx-auto my-5 block h-auto w-full rounded-xl"
            unoptimized
            loading="lazy"
          />
        ))}
      </div>
    </Reveal>
  );
}
