/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: '/meena-portfolio-fullstack',
  assetPrefix: '/meena-portfolio-fullstack/',
}

module.exports = nextConfig