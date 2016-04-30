var request = require('request');
var axios = require('axios');

var getDistance = function(lat1, lon1, lat2, lon2){
    var R = 6371000; // metres
    var φ1 = lat1 * (Math.PI / 180);
    var φ2 = lat2 * (Math.PI / 180);
    var Δφ = (lat2-lat1) * (Math.PI / 180);
    var Δλ = (lon2-lon1) * (Math.PI / 180);

    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = R * c;
    return d;
  }

var getClosestStation = function(stationArray){
    var statArr = stationArray.sort(function(a,b){
        return a.distFromCurLoc - b.distFromCurLoc;
      });
    return statArr[0];
    }

var getListOfStations = function(request) {
    console.log('lat long: ', request.body.latLng);
    var lat1 = request.body.latLng[0];
    var long1 = request.body.latLng[1];
    // var base = 'http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V';
    var base = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D%27http%3A%2F%2Fapi.bart.gov%2Fapi%2Fstn.aspx%3Fcmd%3Dstns%26key%3DMW9S-E7SL-26DU-VV8V%27&format=json&diagnostics=true&callback=';
    var stationArray = [];
    axios.get(base)
      .then((resp) => {
        resp.data.query.results.root.stations.station.forEach((obj) => {
          var distance = getDistance(lat1, long1, obj.gtfs_latitude, obj.gtfs_longitude);
          var BARTobj = {
            'abbr': obj.abbr,
            'name': obj.name,
            'address': obj.address,
            'city': obj.city,
            'county': obj.county,
            'zipcode': obj.zipcode,
            'latitude': obj.gtfs_latitude,
            'longitude': obj.gtfs_longitude,
            'distFromCurLoc': distance
          }
          stationArray.push(BARTobj);
        });
        var closestStation = getClosestStation(stationArray);
        console.log("ClosestStation: ", closestStation);
      })
      .catch((response) => {
        if (response instanceof Error){
          console.log('Error: ', response.message);
        } else {
          // console.log(response.data);
        }
      });
  }

var getNextDeparture = function(station){
    var base = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D%27http%3A%2F%2Fapi.bart.gov%2Fapi%2Fetd.aspx%3Fcmd%3Detd%26orig%3D' + station.abbr + '%26key%3DMW9S-E7SL-26DU-VV8V%27&format=json';
    var deptArr = [];
    axios.get(base)
      .then((resp) => {
        resp.data.query.results.root.station.etd.forEach((destination) => {
          
        });
      })
      .catch((response) => {
        if (response instanceof Error){
          console.log('Error: ', response.message);
        } else {
          console.log('win?');
        }
      });
                                                                                                               
}
  var getThing = function(request, response){
    console.log('lat long: ', request.body.latLng);
    console.log('yay this worked getThing');
  }

  module.exports = {
    getThing: getThing,
    getListOfStations: getListOfStations
  }