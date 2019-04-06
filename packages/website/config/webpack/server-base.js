const commonConfig = require('./common')
const mergeDeepLeft = require('ramda').mergeDeepLeft
const path = require('path')

module.exports = mergeDeepLeft({
  entry: './src/server/index.js',
  output: {
    publicPath: '/',
    filename: 'index.js',
    path: path.resolve(__dirname, '../../dist/server')
  },
  target: 'node'
}, commonConfig)
