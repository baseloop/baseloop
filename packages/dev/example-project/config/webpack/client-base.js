const merge = require('webpack-merge')
const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = merge(require('./common'), {
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
})