const path = require('path');
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      files: ['./*.html'],
      server: { baseDir: ['./'] },
    }),
  ],
  watch: true,
  stats: 'errors-only',
});

module.exports = webpackConfig;
