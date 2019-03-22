const baseConfig = require('./webpack-client-base-config')
const mergeDeepLeft = require('ramda').mergeDeepLeft

module.exports = mergeDeepLeft({
  mode: 'production',
}, baseConfig)
