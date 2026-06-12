/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // "standalone" for Docker, undefined (default) for Vercel
  output: process.env.BUILD_TARGET === "docker" ? "standalone" : undefined,
  env: {
    stackbitPreview: process.env.STACKBIT_PREVIEW,
  },
  trailingSlash: true,
  reactStrictMode: true,
  allowedDevOrigins: ["192.168.1.84"],
};

module.exports = nextConfig;
