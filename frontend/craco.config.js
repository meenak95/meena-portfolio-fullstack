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
}

