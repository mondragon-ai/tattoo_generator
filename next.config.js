/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.windows.net"
      },
      {
        protocol: 'https',
        hostname: '**.dribbble.com',
      },
      {
        protocol: 'https',
        hostname: '**.shopify.com'
      },
      {
        protocol: 'https',
        hostname: 'vagazine.com'
      },
    ],
  },
}

module.exports = nextConfig
