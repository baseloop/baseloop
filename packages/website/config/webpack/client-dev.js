const baseConfig = require('./webpack-client-base-config')
const mergeDeepLeft = require('ramda').mergeDeepLeft

module.exports = mergeDeepLeft({
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
}, baseConfig)
