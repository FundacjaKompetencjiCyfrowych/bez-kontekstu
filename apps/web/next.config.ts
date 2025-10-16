import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/assets/:path*',
        destination: '/app/assets/:path*',
      },
    ];
  },
};

export default nextConfig;
