const path = require('path')

module.exports = {
  entry: './src/server/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../dist/server')
  },
  mode: 'development',
  target: 'node',
  devtool: 'eval-cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules|bower_components/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['babel-plugin-styled-components']
          },
        },
      }
    ]
  }
}
