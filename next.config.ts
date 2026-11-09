import path from "node:path";
import type { NextConfig } from "next";

// PostHog is proxied through /ingest; NEXT_PUBLIC_POSTHOG_REGION picks the EU cloud, otherwise US.
const posthog = process.env.NEXT_PUBLIC_POSTHOG_REGION === "eu" ? "eu" : "us";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // a stray lockfile in the home directory would otherwise be picked as the workspace root
  turbopack: { root: path.resolve(__dirname) },
  images: { formats: ["image/avif", "image/webp"] },
  allowedDevOrigins: ["127.0.0.1"],
  // PostHog's API paths end in a slash
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      { source: "/ingest/static/:path*", destination: `https://${posthog}-assets.i.posthog.com/static/:path*` },
      { source: "/ingest/array/:path*", destination: `https://${posthog}-assets.i.posthog.com/array/:path*` },
      { source: "/ingest/:path*", destination: `https://${posthog}.i.posthog.com/:path*` },
    ];
  },
};

export default nextConfig;
