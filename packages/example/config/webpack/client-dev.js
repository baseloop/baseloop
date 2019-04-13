const baseConfig = require('./client-base')
const mergeDeepLeft = require('ramda').mergeDeepLeft

module.exports = mergeDeepLeft({
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
}, baseConfig)
