"use strict";
var _ = require('underscore');
var keys = require('../configuration.js');
var axios = require('axios');

function getBarsList(location, radius) {
  // build this request object
    // location: -33.8670,151.1957
    // radius: 500
    // types: food
    // name: cruise
    // key: API_KEY
  //https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670,151.1957&radius=500&types=bar=cruise&key=YOUR_API_KEY
  // console.log("bars.js: request is: ", request);
  // console.log("bars.js: request.body.location: ", request.body.location);
  // console.log("bars.js: request.body.radius: ", request.body.radius);
  //console.log("request.body.location", request.body.location);
  // build request string
  let base = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'
  let params = {
    location: location,
    radius: radius,
    type: 'bar',
    opennow: true,
    // rankby: 'distance',
    key: keys.GOOGLE_PLACES_API_KEY
  }

  return axios.get(base, params)
    .then((response) => {
      // console.log("BarsList from Google", response.data);
      return response.data;
    })
    .catch(function (response) {
      if (response instanceof Error) {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', response.message);
      } else {
        // The request was made, but the server responded with a status code
        // that falls out of the range of 2xx
        console.log(response.data);
        console.log(response.status);
        console.log(response.headers);
        console.log(response.config);
      }
    });  // then
  // return results
}

module.exports = getBarsList
// {
//   getBarsList: getBarsList
// }
