const path = require('path');

module.exports = {
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      "Access-Control-Allow-Methods": "GET"
    }
  },
  entry: './index.js',
  output: {
    filename: './dist/bundle.js'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader'}
    ]
  }
}