"use strict";
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHot = require('webpack-hot-middleware');
var bars = require('./server/bars.js');

var compiler = webpack(webpackConfig);

var app = express();

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
app.use(express.static(path.join(__dirname, 'client/')));

app.post('/bars', (request, response)=> {
  console.log("POST request to /bars: ", request);
  response.send('hello world');
});

app.listen(process.env.PORT || 3000);
