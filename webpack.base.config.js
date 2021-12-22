const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './css/main.css',
      chunkFilename: '[id].css',
    }),
  ],
};

module.exports = config;
