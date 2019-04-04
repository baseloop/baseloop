const baseConfig = require('./server-base')
const mergeDeepLeft = require('ramda').mergeDeepLeft

module.exports = mergeDeepLeft({
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
}, baseConfig)
