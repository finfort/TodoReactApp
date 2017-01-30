
var path = require('path');
var webpack = require('webpack');
/* eslint-disable */
module.exports = {
  filename: __filename,
  // debug: true,
  devtool: 'source-map',

  entry: [
   //'webpack-dev-server/client?http://localhost:8080/webpack-dev-server/', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    pathinfo: true,
    filename: 'bundle.js'
  },
    plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel']
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
