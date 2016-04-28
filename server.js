"use strict";
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHot = require('webpack-hot-middleware');
var getBarsList = require('./server/bars.js');
var bodyParser = require('body-parser');


var compiler = webpack(webpackConfig);

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
app.use(express.static(path.join(__dirname, 'client/')));




app.post('/bars', (request, response, next) => {
  console.log("server.js: request.body: ", request.body);
  console.log("server.js: request.body.location: ", request.body.location);
  getBarsList(request.body.location, request.body.radius)
  .then((barsList) => {
    console.log("bars list is this: ", barsList);
    response.writehead(200);
    response.write(barsList);
    response.send();
  });

    

  // console.log("POST request to /bars: ", request);
  // response.send('hello world');
});

// handleSubmission = function(){
//   axios.post('/getdata',{
//     data: data
//   }).then(function(response){
//     this.setState({
//       property: response.data.title
//     })
//   })   
// }


// app.post('/getdata', function(request,response){
//   console.log("getdata test:");
//   var data = request.body.data;
//   getDataFromGoogleAPI(data).then(function(response){
//     res.send(response);
//   });
// })

app.listen(process.env.PORT || 3000);
