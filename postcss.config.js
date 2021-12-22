module.exports = {
  plugins: [
        require('postcss-preset-env')({
      browsers: 'last 2 versions',
    }),
    require('postcss-import'),
    // require('postcss-custom-properties'),
    require(`autoprefixer`)({ grid: true }),
    ...(process.env.NODE_ENV === 'production'
      ? [
          require(`cssnano`)({
            preset: 'default',
          }),
        ]
      : []),
  ],
};
