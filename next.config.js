/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig

module.exports = {
  images: {
    domains: ['cdn.sanity.io', 'res.cloudinary.com'],
  },
  async headers() {
    return [
      {
        source: '/properties',
        headers: [
          {
            key: 'Accept',
            value: 'application/json'
          }
        ]
      }
    ]
  }
}