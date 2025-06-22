/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'calm-addition-271c24a97d.strapiapp.com',
      },
      {
        protocol: 'https',
        hostname: 'calm-addition-271c24a97d.media.strapiapp.com',
      },
    ],
  },
}

module.exports = nextConfig 