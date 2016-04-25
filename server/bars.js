var axios = require('axios');
var _ = require('underscore');

import { GOOGLE_PLACES_API_KEY } from '../configuration.js';

export default getBarsList(request) {
  // accept request object with lat/long in the body
  // build this request object
  // location: -33.8670,151.1957
  // radius: 500
  // types: food
  // name: cruise
  // key: API_KEY
  //https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670,151.1957&radius=500&types=bar=cruise&key=YOUR_API_KEY

  // build request string
  let base = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
  let params = {
    location: request.body.location,
    radius: request.body.radius,
    type: 'bar',
    opennow: true,
    rankby: 'distance',
    key: GOOGLE_PLACES_API_KEY
  }
  // iterate through parameters
    // add '&' + key + '=' + value to string
  // _.each(parameters, (item, key)=>{
  //   base += key + '=' + value +'&';
  // });
  // make request with axios
  axios.get(base, {params})
    .then((response) => {
      console.log("BarsList from Google", response);
      return response;
    })
    .catch(function (response) {
      console.log("Error retrieving barsList from Google", response);
      return response;
    });
  // then
  // return results
}
