const commonConfig = require('./common')
const merge = require('webpack-merge')
const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = merge(commonConfig, {
  entry: './src/client/index.ts',
  output: {
    publicPath: '/',
    filename: 'index.js',
    path: path.resolve(__dirname, '../../dist/client')
  },
  plugins: [
    new HtmlWebPackPlugin({
      hash: true,
      favicon: './src/static/icons/favicon.png',
      template: './src/static/index.html',
      filename: './index.html'
    })
  ]
})
