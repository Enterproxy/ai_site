/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tell Next to skip TS type‐checking errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Likewise, don’t fail the build on ESLint issues
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    // all pdf.worker.min.js files should be emitted as resources
    config.module.rules.push({
      test: /pdf\.worker\.min\.js$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/chunks/[name].[hash][ext]',
      },
    });
    return config;
  },
};

module.exports = nextConfig;
