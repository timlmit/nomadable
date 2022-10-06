/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["tripnote.sgp1.cdn.digitaloceanspaces.com"],
  },
};

module.exports = nextConfig;
