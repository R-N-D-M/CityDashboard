var path = require('path');
var express = require('express');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHot = require('webpack-hot-middleware');

var compiler = webpack(webpackConfig);

var app = express();

// app.use(express.static(path.join(__dirname, 'client/')));

////////////////////////////////////////////////////////////////////////////////////////////////////////
// TO RUN THE ES6 VERSION UNCOMMENT THE LINES BELOW AND COMMENT OUT LINE 12 ABOVE.
////////////////////////////////////////////////////////////////////////////////////////////////////////

app.use(webpackMiddleware(compiler, {
  quiet: true,
  noInfo: true,
  stats: {
    colors: true,
    reasons: true
  },
  publicPath: webpackConfig.output.publicPath
}));
app.use(webpackHot(compiler));
app.use(express.static(path.join(__dirname, 'es6Refactor/')));

////////////////////////////////////////////////////////////////////////////////////////////////////////


app.listen(process.env.PORT || 3000);
