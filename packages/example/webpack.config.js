const webpack = require('webpack')
const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

// target = 'client' | 'server'
// mode   = 'development' | 'production'
module.exports = ({ target, mode }) => {
  return {
    mode,
    devtool: mode === 'development' ? 'eval-cheap-module-source-map' : undefined,
    entry: `./src/${target}/index.ts`,
    target: target === 'server' ? 'node' : undefined,
    output: {
      publicPath: '/',
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist/' + target)
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules\/(?!(@baseloop)\/).*/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
              plugins: [
                'babel-plugin-styled-components',
                '@babel/proposal-class-properties',
                '@babel/proposal-object-rest-spread'
              ]
            }
          }
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
        },
        {
          test: /\.md$/,
          use: [
            {
              loader: 'html-loader'
            },
            {
              loader: 'markdown-loader'
            }
          ]
        }
      ]
    },
    resolve: {
      symlinks: false,
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    plugins: [
      new webpack.NormalModuleReplacementPlugin(/@baseloop\/[a-z]+$/, resource => {
        resource.request = resource.request + '/src/index'
      }),
      new HtmlWebPackPlugin({
        hash: true,
        favicon: './src/common/static/favicon.png',
        template: './src/common/static/index.html',
        filename: './index.html'
      })
    ]
  }
}
