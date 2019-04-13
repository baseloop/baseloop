module.exports = {
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
    symlinks: false
  }
}
