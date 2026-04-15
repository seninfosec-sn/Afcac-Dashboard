import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow reading/writing data files from project root
  serverExternalPackages: ["bcryptjs"],
};

export default nextConfig;
