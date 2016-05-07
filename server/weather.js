// app id 9fb12d07534f5cbab4ff6c758a01f407
var axios = require('axios');

var APP_ID = process.env.APP_ID;

var getWeather = function(request, response) {
  var url;
  var latLng = request.body.latLng;  // [lat, lng]
  // console.log("data: ", data);
  // response.status(200).send("Weather worked yo!");
  // console.log("latLng: ", latLng);
  url = "http://api.openweathermap.org/data/2.5/weather?lat=" + latLng[0] + "&lon=" + latLng[1] + "&appid=" + APP_ID;

  // console.log("url: ", url);

  axios.get(url)
    .then( (resp) => {
      // console.log("Weather: ", resp.data);
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


// let url = "http://api.openweathermap.org/data/2.5/weather?lat=" + this.state.locationTrue[0] + "&lon=" + this.state.locationTrue[1] + "&appid=" + this.state.appid;
//
// // console.log("url: ", url);
//
// Axios.get(url)
//   .then( (response) => {
//     console.log("Weather: ", response);
//     this.setState({
//       city: response.data.name,
//       description: response.data.weather[0].description,
//       temp: response.data.main.temp,
//       temp_max: response.data.main.temp_max,
//       temp_min: response.data.main.temp_min,
//       humidity: response.data.main.humidity,
//       pressure: response.data.main.pressure,
//       winddeg: response.data.wind.deg,
//       windspeed: response.data.wind.speed
//     });
//   })
//   .catch( (response) => {
//     console.log("Error getting weather: ", response);
//   });
