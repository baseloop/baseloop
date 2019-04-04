const baseConfig = require('./server-base')
const mergeDeepLeft = require('ramda').mergeDeepLeft

module.exports = mergeDeepLeft({
  mode: 'production',
}, baseConfig)
