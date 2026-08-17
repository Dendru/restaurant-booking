import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,

  allowedDevOrigins: ['172.25.176.1', 'localhost:3000']

};

export default nextConfig;
