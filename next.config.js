/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    // Emituj lokalny pdf.worker.min.js jako zasób statyczny
    config.module.rules.push({
      test: /pdf\.worker\.min\.js$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/pdfjs/[name].[hash][ext]',
      },
    });

    return config;
  },
};

module.exports = nextConfig;
