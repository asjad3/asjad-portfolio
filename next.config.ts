import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // a stray lockfile in the home directory would otherwise be picked as the workspace root
  turbopack: { root: path.resolve(__dirname) },
  images: { formats: ["image/avif", "image/webp"] },
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
