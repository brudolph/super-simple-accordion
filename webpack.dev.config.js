const path = require('path');
const { merge } = require('webpack-merge');
const base = require('./webpack.base.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  mode: 'development',
  entry: {
    main: ['./src/demo/index.js'],
  },
  output: {
    filename: 'index.js',
    publicPath: '/',
  },
  optimization: {
    minimize: false,
  },
  devServer: {
    open: true,
    hot: true,
    host: 'localhost',
    port: 9821,
  },
  plugins: [new HtmlWebpackPlugin()],
};
module.exports = merge(base, config);
