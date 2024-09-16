const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  mode: 'production', // Set production mode for minification
  entry: {
    core: './js/index.js',
    style: './css/index.css',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.js',
  },
  resolve: {
    alias: {
      '@': resolve('src'),
    },
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
      new OptimizeCSSAssetsPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true }, // Remove comments
            },
          ],
        },
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../[name].bundle.css',
      chunkFilename: '[id].css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jQuery',
      'window.jQuery': 'jquery',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader',
      },
      {
        test: /\.(jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '../[path][name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('autoprefixer'),
                  require('pixrem'),
                  require('postcss-inline-svg'),
                ],
              },
            },
          },
        ],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
          formatter: require('eslint-friendly-formatter'),
        },
      },
    ],
  },
};
