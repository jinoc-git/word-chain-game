/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    scrollRestoration: true,
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/naver',
  //       destination: 'https://openapi.naver.com/:path*',
  //     },
  //   ];
  // },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(mp3|ogg|wav|flac)$/i,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/sounds',
          // outputPath: 'static/sounds',
          outputPath: `${options.isServer ? '../' : ''}static/sounds/`,
          // esModule: false,
        },
      },
    });

    return config;
  },
};

export default nextConfig;
