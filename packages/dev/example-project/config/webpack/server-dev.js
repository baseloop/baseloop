const merge = require('webpack-merge')

module.exports = merge(require('./server-base'), {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
})

