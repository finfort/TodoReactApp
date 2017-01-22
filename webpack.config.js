/* eslint-disable */
module.exports = {
  filename: __filename,
  debug: true,
  devtool: 'source-map',


  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    pathinfo: true,
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
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
