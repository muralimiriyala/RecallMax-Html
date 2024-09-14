const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const TerserPlugin = require('terser-webpack-plugin')

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  }
})

module.exports = webpackConfig
