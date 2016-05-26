"use strict";
var _ = require('underscore');
var keys = require('../configuration.js');
var axios = require('axios');

function getBarsList(location, radius) {
  let base = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'
  let params = {
    location: location,
    radius: radius,
    type: 'bar',
    opennow: true,
    key: keys.GOOGLE_PLACES_API_KEY
  }
// return results
  return axios.get(base, params)
    .then((response) => {
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
    });  
  
}

module.exports = getBarsList
