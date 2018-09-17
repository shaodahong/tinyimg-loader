const tinyPng = require('../lib')
const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    app: path.join(__dirname, '../demo/index.js')
  },
  output: {
    path: path.join(__dirname, '../test/')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'img/[name].[ext]',
              publicPath: '/'
            }
          },
          'tinyimg-loader'
        ]
      }
    ]
  },
  optimization: {
    minimize: false
  }
}
