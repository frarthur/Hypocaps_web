/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    output: "standalone",
    env: {
        stackbitPreview: process.env.STACKBIT_PREVIEW
    },
    trailingSlash: true,
    reactStrictMode: true,
    allowedDevOrigins: [
        '192.168.1.84'
    ]
};

module.exports = nextConfig;
