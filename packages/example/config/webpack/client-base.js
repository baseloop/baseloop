const commonConfig = require('./common')
const mergeDeepLeft = require('ramda').mergeDeepLeft
const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = mergeDeepLeft({
  entry: './src/client/index.js',
  output: {
    publicPath: '/',
    filename: 'index.js',
    path: path.resolve(__dirname, '../../dist/client')
  },
  plugins: [
    new HtmlWebPackPlugin({
      hash: true,
      favicon: './src/common/static/favicon.png',
      template: './src/common/static/index.html',
      filename: './index.html'
    })
  ]
}, commonConfig)
