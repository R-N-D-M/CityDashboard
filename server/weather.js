var axios = require('axios');
var APP_ID = process.env.APP_ID;
var getWeather = function(request, response) {
  var url;
  var latLng = request.body.latLng;  // [lat, lng]
  url = "http://api.openweathermap.org/data/2.5/weather?lat=" + latLng[0] + "&lon=" + latLng[1] + "&appid=" + APP_ID;
  axios.get(url)
    .then( (resp) => {
      sendWeather(resp.data, request, response)
    })
    .catch( (resp) => {
      console.log("Error getting weather: ", resp);
      response.status(503).send("Error getting weather!");
  });
};

var sendWeather = function (data, request, response) {
  var objToSend = {
        city: data.name,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        temp: data.main.temp,
        temp_max: data.main.temp_max,
        temp_min: data.main.temp_min,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        winddeg: data.wind.deg,
        windspeed: data.wind.speed
  };
  return response.status(200).send(objToSend);
};

module.exports = {
  getWeather: getWeather
};
