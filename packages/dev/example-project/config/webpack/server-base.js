const merge = require('webpack-merge')
const path = require('path')

module.exports = merge(require('./common'), {
  entry: './src/server/index.js',
  output: {
    publicPath: '/',
    filename: 'index.js',
    path: path.resolve(__dirname, '../../dist/server')
  },
  target: 'node'
})
