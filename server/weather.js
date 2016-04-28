var request = require('request');

var getWeather = function(request, response) {
  var data = request.body;
  console.log("data: ", data);
  response.status(200).send("Weather worked yo!");
}

module.exports = {
  getWeather: getWeather
};
