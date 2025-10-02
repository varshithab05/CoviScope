import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://coviscope-3s5j.onrender.com/:path*',
      },
    ];
  },
  reactStrictMode: true,
};

export default nextConfig;