// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
  },
  serverExternalPackages: ['sharp', 'gray-matter'],
};

export default nextConfig;