/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hub.dummyapis.com",
      },
    ],
  },
};

module.exports = nextConfig;
