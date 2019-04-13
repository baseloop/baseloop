const baseConfig = require('./client-base')
const mergeDeepLeft = require('ramda').mergeDeepLeft

module.exports = mergeDeepLeft({
  mode: 'production',
}, baseConfig)
