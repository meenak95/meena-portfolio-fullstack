module.exports = {
  style: {
    postcss: {
      plugins: [
        require('@tailwindcss/postcss'),
        require('autoprefixer'),
      ],
    },
  },
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.output = {
        ...webpackConfig.output,
        publicPath: process.env.PUBLIC_URL || '/meena-portfolio-fullstack/',
      };
      return webpackConfig;
    },
  },
}

