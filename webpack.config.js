var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer')

var HtmlWebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);

module.exports = {
  devtool: '#cheap-module-eval-source-map',
  entry: [
    'bootstrap-loader',
    'tether',
    path.resolve(ROOT_PATH, 'client/app.jsx'),
    'webpack-hot-middleware/client'
  ],
  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      loaders: ['eslint'],
      include: path.resolve(ROOT_PATH, 'client')
    }],
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel'
    },
    {
      test: /\.scss$/,
      loaders: ['style', 'css', 'postcss', 'sass']
    },
    {
      test: /bootstrap[\/\\]dist[\/\\]js[\/\\]umd[\/\\]/,
      loader: 'imports?jQuery=jquery'
    },
    {
      test: /\.(jpg|jpeg|gif|png|ico)$/,
      exclude: /node_modules/,
      loader:'file-loader?name=img/[path][name].[ext]&context=./app/images'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  postcss: [autoprefixer],
  output: {
    path: path.resolve(ROOT_PATH, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      'window.Tether':'tether',
    }),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]
}
