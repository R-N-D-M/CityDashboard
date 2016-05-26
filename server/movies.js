var request = require('request');
var axios = require('axios');
var Movies_ID = process.env.MOVIES_ID;

var getMovies = function(request, response) {
  var url;
  var latLng = request.body.latLong;
  var date = new Date();

  var startDate = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
  url = 'http://data.tmsapi.com/v1.1/movies/showings?startDate=' + startDate + '&lat=' + latLng[0] + '&lng=' + latLng[1] + '&radius=10&units=mi&api_key=' + Movies_ID;
  axios.get(url)
    .then( (resp) => {
      sendMovies(resp.data, request, response)
    })
    .catch( (resp) => {
      resp.status(503).send('Error getting showtimes');
  });
};

var sendMovies = function(data, request, response) {
  data = apiHelper(data);
  response.status(200).send(data);
}

var apiHelper = function(data) {

  return data.reduce(function(result, curr){
  var showTimesAtTheatre = curr.showtimes.reduce(function(innerResult, current){
    var theatreName = current.theatre.name;
    innerResult[theatreName] = (innerResult[theatreName]) ? innerResult[theatreName].concat(current.dateTime) : [current.dateTime];
    return innerResult;
  }, {});

    var currentTitle = curr.title;

    for (var key in showTimesAtTheatre) {
      var titleShowtimes = {
        title: currentTitle,
        showtimes: showTimesAtTheatre[key]
      };

      result[key] = (!result[key]) ? [titleShowtimes] : result[key].concat(titleShowtimes);
    }
  return result;
}, {});
}

module.exports = {
  getMovies: getMovies
};
