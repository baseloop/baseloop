const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/client/index.js',
  output: {
    publicPath: '/',
    filename: 'index.js',
    path: path.resolve(__dirname, '../dist/client')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules\/(?!(@baseloop)\/).*/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['babel-plugin-styled-components']
          },
        },
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8000,
            name: 'images/[hash]-[name].[ext]'
          }
        }
      },
      {
        test: /\.(ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[hash]-[name].[ext]'
          }
        }
      }
    ]
  },
  resolve: {
    symlinks: false
  },
  plugins: [
    new HtmlWebPackPlugin({
      hash: true,
      favicon: './src/static/favicon.png',
      template: './src/static/index.html',
      filename: './index.html'
    }),
  ]
}
