import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Asjad",
    description: site.description,
    start_url: "/",
    display: "browser",
    background_color: "#fbfbfa",
    theme_color: "#fbfbfa",
    icons: [{ src: "/icon.svg", type: "image/svg+xml", sizes: "any" }],
  };
}
