const path = require('path');

const PATHS = {
  app: path.resolve(__dirname,'app'),
  build: path.resolve(__dirname,'build')
};

module.exports = {
  entry: {
    app: PATHS.app + "/index.jsx"
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
        loader: 'file-loader'
      },
      {
        test: /\.png$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.jpg$/,
        loader: 'file-loader'
      },
    ]
  },
  devServer: {
    host: '127.0.0.1',
    port: '3000'
  }
};
