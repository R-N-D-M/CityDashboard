var request = require('request');
var axios = require('axios');

var Movies_ID = '6gckbwqssxybn76ccsu56nd6';

var getMovies = function(request, response) {
  var url;
  var latLng = request.body.latLong;
  var date = new Date();
  var startDate = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
  url = 'http://data.tmsapi.com/v1.1/movies/showings?startDate=' + startDate + '&lat=' + latLng[0] + '&lng=' + latLng[1] + '&radius=0.5&units=mi&api_key=' + Movies_ID;
  console.log(url);
  
  axios.get(url)
    .then( (resp) => {
      console.log("Movies: ",resp.data);
      sendMovies(resp.data, request, response)

    })
    .catch( (resp) => {
      resp.status(503).send('Error getting showtimes');
  });

};

var sendMovies = function(data, request, response) {

  response.status(200).send(data);
}



module.exports = {
  getMovies: getMovies
};