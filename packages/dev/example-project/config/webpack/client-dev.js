const merge = require('webpack-merge')

module.exports = merge(require('./client-base'), {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
})

