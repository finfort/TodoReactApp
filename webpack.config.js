var path = require('path');
var webpack = require('webpack');
/* eslint-disable */
module.exports = {
  filename: __filename,
  devtool: 'source-map',

  entry: [
    'webpack-dev-server/client?http://localhost:8080', // WebpackDevServer host and port
    // 'webpack/hot/dev-server', // "only" prevents reload on syntax errors
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    pathinfo: true,
    filename: 'bundle.js'
  },
  // plugins: [
  //   new webpack.HotModuleReplacementPlugin()
  // ],
  module: {

    loaders: [    
     {
        test: /\.css$/,
        loaders: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src')
      }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  devServer: {
    // hot: true,//hot 
    historyApiFallback: true,
    contentBase: './'
  }
};
