const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const postcssPlugins = [require('postcss-preset-env')];
if (process.env.NODE_ENV == 'production')
  postcssPlugins.push(require('cssnano'));

let buildPath = './build';
if (process.env.NODE_ENV === 'production') buildPath = './dist';

module.exports = {
  entry: {
    main: ['./src/index.js', './src/scss/main.scss'],
  },

  output: {
    path: path.resolve(__dirname, `${buildPath}/js`),
    filename: 'accordions.min.js',
  },

  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'src')],
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        // Test our .scss files, web pack executes the last in this array first (sass-loader then postcss-loader then css-loader)
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: postcssPlugins,
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                sourceMap: true,
                includePaths: ['node_modules', 'src/sass'],
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-proposal-class-properties'],
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../css/[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};

if (process.env.NODE_ENV === 'development') {
  module.exports.devtool = 'source-map';
  module.exports.watch = true;
  // postcssPlugins.push(require('postcss-css-variables')({ preserve: false }))
}
