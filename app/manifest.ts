import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jonathan Rodriguez Portfolio",
    short_name: "JR Portfolio",
    description:
      "Full-Stack Developer & UI/UX Engineer — React/Next.js, edge AI analytics, enterprise dashboards.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
