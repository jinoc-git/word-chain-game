/** @type {import('next').NextConfig} */
const nextConfig = {
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
