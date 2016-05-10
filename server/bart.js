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

var getListOfStations = function(request, response) {
    var lat1 = request.body.latLng[0];
    var long1 = request.body.latLng[1];
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
        console.log('closestStation: ', closestStation);
        return closestStation;
      })
      .then((closestStation) => {
        console.log('line 54: got this far');
        getNextDeparture(closestStation, request, response);
      })
      .catch((response) => {
        if (response instanceof Error){
          console.log('line 58: Error: ', response.message);
          console.log('error: response', response);
        } 
      });
  }

var getNextDeparture = function(originStation, request, response){
  var base = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D%27http%3A%2F%2Fapi.bart.gov%2Fapi%2Fetd.aspx%3Fcmd%3Detd%26orig%3D' + originStation.abbr + '%26key%3DMW9S-E7SL-26DU-VV8V%27&format=json';
  var trainData = {};
  var deptArr = [];
  console.log('line 69: got this far');
  axios.get(base)
    .then((resp) => {
      resp.data.query.results.root.station.etd.forEach((obj) => {
        console.log('line 71: obj.estimate', obj.estimate);
        // console.log('line 74: obj is: ', obj);
        console.log('line 75: obj.estimate.length', obj.estimate.length);
        obj.estimate = Array.isArray(obj.estimate) ? obj.estimate : [obj.estimate];
        var trainObj = {
          'destination': obj.destination,
          'time': obj.estimate[0].minutes,
          'direction': obj.estimate[0].direction,
          'platform': obj.estimate[0].platform
        }
        console.log('line 82: trainObj is: ', trainObj);
        deptArr.push(trainObj);
        trainData.originStation = originStation;
        trainData.deptArr = deptArr;
      });
      console.log('line 87: trainData', trainData);
      sendNextDeparture(trainData, request, response);
    })
    .catch((response) => {
      if (response instanceof Error){
      } 
    });
  };

var sendNextDeparture = function(data, request, response){
  return response.status(200).send(data);
};

module.exports = {
  getListOfStations: getListOfStations
}