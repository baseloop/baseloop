const baseConfig = require('./client-base')
const merge = require('webpack-merge')

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
})
