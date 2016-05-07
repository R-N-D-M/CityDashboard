// google maps server key AIzaSyCtFen6UlngOLpcBYNQM19oVYNUJD-jwSk
// backup key AIzaSyAsfSkK4rdVHbJUd7XLRxaw7XGGLDzAd_Y
// backup browser key AIzaSyDoDZbCJKAUjIxHNiFNRZGtL5RsVnuyQw0
var axios = require('axios');

var SERVER_KEY = process.env.NEARBY_ID;
var getGoogleData = function(request, response) {
  var latLng = request.body.latLng;
  var latLngStr = "" + latLng[0] + "," + latLng[1];
  var radius = 805; // 805 meters = 0.5 mile
  // var type = "restaurant";
  // var type = "bar";
  var type = request.body.type;
  // var name = "burger";
  var name = "";
  var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + latLngStr + "&radius=" + radius + "&type=" + type + "&name" + name + "&key=" + SERVER_KEY;
  var urlRankByDistance = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + latLngStr + "&rankby=distance" + "&type=" + type + "&name" + name + "&key=" + SERVER_KEY;
  // console.log("url: ", url);
  axios.get(url)
    .then( (resp) => {
      // console.log("bars: ", resp.data);
      sendGoogleData(resp.data, request, response);
    })
    .catch( (resp) => {
      console.log("Error getting bars: ", response);
      response.status(503).send("Error getting google list!");
  });

  // return response.status(200).send("You REALLY want google data?");
}

var sendGoogleData = function(data, request, response) {
  return response.status(200).send(data);
};


module.exports = {
  getGoogleData: getGoogleData,
  sendGoogleData: sendGoogleData
};
