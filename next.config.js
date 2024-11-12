/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/RealTimeStudentSuccessPredictionSystem',
  assetPrefix: '/RealTimeStudentSuccessPredictionSystem/',
  reactStrictMode: true,
}

module.exports = nextConfig 