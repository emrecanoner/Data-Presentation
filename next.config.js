/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/RealTimeStudentSuccessPredictionSystem',
  assetPrefix: '/RealTimeStudentSuccessPredictionSystem/',
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
  trailingSlash: true,
  distDir: 'out',
}

module.exports = nextConfig 