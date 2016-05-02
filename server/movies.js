var request = require('request');
var axios = require('axios');

// var Movies_ID = '6gckbwqssxybn76ccsu56nd6';
// var Movies_ID = 'dvnxckvy52m4mpeh3zfqpyhc';
var Movies_ID = 'qk93ft2mkdfavw8abjr4yy9b';

var getMovies = function(request, response) {
  var url;
  var latLng = request.body.latLong;
  var date = new Date();

  var startDate = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
  url = 'http://data.tmsapi.com/v1.1/movies/showings?startDate=' + startDate + '&lat=' + latLng[0] + '&lng=' + latLng[1] + '&radius=0.5&units=mi&api_key=' + Movies_ID;
  console.log('this is the url', url)
  axios.get(url)
    .then( (resp) => {
      // console.log("Movies: ",resp.data);
      sendMovies(resp.data, request, response)

    })
    .catch( (resp) => {
      resp.status(503).send('Error getting showtimes');
  });

};

var sendMovies = function(data, request, response) {
  // console.log('this is the data',data);

  data = apiHelper(data);

  console.log('this is the data',data);

  response.status(200).send(data);
}

var apiHelper = function(data) {

  return data.reduce(function(result, curr){
  var showTimesAtTheatre = curr.showtimes.reduce(function(innerResult, current){
    var theatreName = current.theatre.name;
    innerResult[theatreName] = (innerResult[theatreName]) ? innerResult[theatreName].concat(current.dateTime) : [current.dateTime];
    return innerResult;
  }, {});
  
    // console.log(showTimesAtTheatre)
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