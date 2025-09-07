module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  webpack: {
    configure: (webpackConfig) => {
      const isDev = process.env.NODE_ENV !== 'production';
      webpackConfig.output = {
        ...webpackConfig.output,
        publicPath: isDev ? '/' : (process.env.PUBLIC_URL || '/meena-portfolio-fullstack/'),
      };
      return webpackConfig;
    },
  },
  devServer: (devServerConfig) => {
    // Force dev middleware to serve assets from root
    devServerConfig.devMiddleware = devServerConfig.devMiddleware || {};
    devServerConfig.devMiddleware.publicPath = '/';

    // Ensure SPA fallback still works from root
    devServerConfig.historyApiFallback = devServerConfig.historyApiFallback || {};
    devServerConfig.historyApiFallback.index = '/';
    return devServerConfig;
  },
}

