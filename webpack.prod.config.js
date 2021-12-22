const path = require("path");
const { merge } = require("webpack-merge");
const base = require("./webpack.base.config.js");
const TerserPlugin = require('terser-webpack-plugin');

const config = {
  entry: {
    main: ['./src/index.js'],
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'js/accordions.js',
    library: {
      name: 'SuperSimpleAccordions',
      type: 'umd',
    },
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ extractComments: false })],
  },
};
module.exports = merge(base, config);
