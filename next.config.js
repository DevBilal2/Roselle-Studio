/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        // Optionally, you can be more specific with pathname patterns
        // pathname: '/s/files/**',
      },
    ],
  },
};

module.exports = nextConfig;
