var axios = require('axios');
var SERVER_KEY = process.env.NEARBY_ID;
var getGoogleData = function(request, response) {
  var latLng = request.body.latLng;
  var latLngStr = "" + latLng[0] + "," + latLng[1];
  var radius = 805; // 805 meters = 0.5 mile
  var type = request.body.type;
  var name = "";
  var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + latLngStr + "&radius=" + radius + "&type=" + type + "&name" + name + "&key=" + SERVER_KEY;
  var urlRankByDistance = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + latLngStr + "&rankby=distance" + "&type=" + type + "&name" + name + "&key=" + SERVER_KEY;
  axios.get(url)
    .then( (resp) => {
      sendGoogleData(resp.data, request, response);
    })
    .catch( (resp) => {
      console.log("Error getting bars: ", response);
      response.status(503).send("Error getting google list!");
  });
}

var sendGoogleData = function(data, request, response) {
  return response.status(200).send(data);
};

module.exports = {
  getGoogleData: getGoogleData,
  sendGoogleData: sendGoogleData
};
