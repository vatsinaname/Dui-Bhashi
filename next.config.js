/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000"],
    }
  },
  typescript: {
    // During development, we want to run typecheck but ignore build errors
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
