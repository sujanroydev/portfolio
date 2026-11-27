/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "streak-stats.demolab.com" },
      { protocol: "https", hostname: "github-readme-activity-graph.vercel.app" },
    ],
  },
  async redirects() {
    return [
      { source: "/github", destination: "https://github.com/skr0411", statusCode: 301 },
      { source: "/linkedin", destination: "https://linkedin.com/in/skr0411", statusCode: 301 },
      { source: "/facebook", destination: "https://facebook.com/sujanroy0411", statusCode: 301 },
      { source: "/knowlet", destination: "https://knowlet.in", statusCode: 301 },
      { source: "/landcalculator", destination: "https://landcalculatorlite.netlify.app", statusCode: 301 },
      { source: "/digitalrdn", destination: "https://digitalrdn.netlify.app", statusCode: 301 },
    ];
  },
};

export default nextConfig;
