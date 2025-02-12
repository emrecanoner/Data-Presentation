/** @type {import('next').NextConfig} */
const fs = require('fs');
const path = require('path');

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/student-success-prediction-system',
  assetPrefix: '/student-success-prediction-system/',
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (isServer) {
      const statsPath = path.join(process.cwd(), 'stats.json');
      if (!fs.existsSync(statsPath)) {
        console.log('stats.json not found, creating sample data...');
        require('./scripts/convertCsvToJson.ts');
      }
    }
    return config;
  },
}

module.exports = nextConfig 