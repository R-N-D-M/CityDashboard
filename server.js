"use strict";
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHot = require('webpack-hot-middleware');
var bodyParser = require('body-parser');
var compiler = webpack(webpackConfig);

// server files
var getBarsList = require('./server/bars.js');
var weather = require('./server/weather.js');
var nearby = require('./server/nearby.js');
var movies = require('./server/movies.js');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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
app.use(express.static(path.join(__dirname, 'dist/')));


app.post('/bars', (request, response, next) => {
  getBarsList(request.body.location, request.body.radius)
  .then((barsList) => {
    response.writehead(200);
    response.write(barsList);
    response.send();
  });
});

app.post('/weather', (request, response)=> {
  // console.log("POST request to /weather");
  weather.getWeather(request, response);
});

app.post('/nearby', (request, response)=> {
  console.log("POST request to /nearby");
  nearby.getGoogleData(request, response);
});

app.post('/movies', (request, response) => {
  console.log('Post request to /movies')
  movies.getMovies(request,response)
});

app.listen(process.env.PORT || 3000);
