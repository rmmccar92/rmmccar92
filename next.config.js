/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {},
  serverRuntimeConfig: {
    REFRESH_TOKEN: process.env.REFRESH_TOKEN,
  },
};

module.exports = nextConfig;
