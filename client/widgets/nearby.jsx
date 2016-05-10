import React from 'react';
import Axios from 'axios';
import _ from 'underscore';

class Nearby extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
      locationLoaded: false,
      locationTrue: this.props.location,
      canPush: false,
      map: null,
      markers: []
    };
  }
  componentDidMount(){
    if(this.state.locationTrue) {
      this.startMap();
    }

    // detect height change and change map height accordingly
    let onElementHeightChange = (elm, callback) => {
      let lastHeight = elm.clientHeight, newHeight;
      (function run() {
        newHeight = elm.clientHeight;
        if( lastHeight != newHeight ) callback();
        lastHeight = newHeight;

        if( elm.onElementHeightChangeTimer ) clearTimeout(elm.onElementHeightChangeTimer);
        elm.onElementHeightChangeTimer = setTimeout(run, 200);
      })();
    }

    // heighter listener
    onElementHeightChange(document.getElementById('nearbycontainer'), () => {
      let height = document.getElementById('nearbycontainer').clientHeight;
      // console.log('nearbycontainer height changed', height);
      // select element height is 25px, the dragme height is 24px
      document.getElementById('map').style.height = "" + (height-25-24) +"px"
      let mapheight = document.getElementById('map').style.height;
      // console.log('map height changed', mapheight);
    });

    // hacky way to just trigger to resize event to get rid of the "100%" map height
    let tempheight = document.getElementById('nearbycontainer').clientHeight;
    document.getElementById('nearbycontainer').style.height = (tempheight + 1).toString() + "px";
    document.getElementById('nearbycontainer').style.height = (tempheight - 1).toString() + "px";
  }
  componentWillReceiveProps(nextProps) {
    console.log("Nearby component received prop change!");
    if(nextProps && nextProps.location && nextProps.location[0] != this.state.locationTrue[0] && nextProps.location[1] != this.state.locationTrue[1]) {
      this.setState({locationTrue: nextProps.location, canPush: true, locationLoaded: true}, () => {
        // this.getWeather();
        // console.log("CAN PUSH!!!", this.state.canPush);
        // alert(this.state.locationLoaded);
        this.startMap();
      });

    }
  }
  handleSelectChange(e) {
    // console.log(e.target.value);
    let url = '/nearby';
    let dataToSend = {
      latLng: this.state.locationTrue,
      type: e.target.value
    };
    Axios.post(url, dataToSend)
      .then( (response) => {
        console.log("/nearby post succeeded: ", response.data);
        this.populateMap(response.data);
      })
      .catch( (response) => {
        console.log("Error getting nearby!");
    });
  }
  populateMap(results) {
    // clear markers beforehand
    let previousMarkers = this.state.markers;
    previousMarkers.forEach( (marker) => {marker.setMap(null);});
    this.setState({markers:[]});

    // populating map
    let data = results.results;
    let map = this.state.map;
    let infowindow = new google.maps.InfoWindow();

    const createMarker = (place) => {
      let placeLoc = place.geometry.location;
      let marker = new google.maps.Marker({
        map: map,
        position: placeLoc
      });

      // store all markers
      let currentMarkers = this.state.markers.slice();
      currentMarkers.push(marker);
      this.setState({markers: currentMarkers});

      // listener for markers clicked
      // google.maps.event.addListener(marker, 'click', function() {
      //   map.setCenter(marker.getPosition());
      // });

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
          place.vicinity + '</div>');
        infowindow.open(map, marker);
      });

      // google.maps.event.addListener(marker, 'mouseout', function(){
      //     infowindow.close();
      //  });
    }

    // creates markers for all results
    for (var i = 0; i < data.length; i++) {
      createMarker(data[i]);
    }
  }
  // this function is only used in conjunction with the button
  handleClick() {
    let url = '/nearby';
    let dataToSend = {
      latLng: this.state.locationTrue,
      type: 'bar'
    };
    Axios.post(url, dataToSend)
      .then( (response) => {
        console.log("/nearby post succeeded: ", response.data);
        this.clickToMap(response.data);
      })
      .catch( (response) => {
        console.log("Error getting nearby!");
    });
  }
  // this function is only used in conjunction with the button
  clickToMap(results) {
    let data = results.results;
    let map;
    let infowindow;

    infowindow = new google.maps.InfoWindow();

    let initMap = () => {
      var start = {
        lat: this.state.locationTrue[0],
        lng: this.state.locationTrue[1]
      };

      map = new google.maps.Map(document.getElementById('map'), {
        center: start,
        zoom: 15
      });
    }

    initMap();

    // create user location's marker
    //////////////////////////////////////////
    // let pinColor = "FE7569";  // bright red
    let pinColor = "2599FF"; // bright blue

    let pinImage = new google.maps.MarkerImage(
      "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
      new google.maps.Size(21, 34),
      new google.maps.Point(0,0),
      new google.maps.Point(10, 34)
    );

    let pinShadow = new google.maps.MarkerImage(
      "http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
      new google.maps.Size(40, 37),
      new google.maps.Point(0, 0),
      new google.maps.Point(12, 35)
    );

    let userMarker = new google.maps.Marker({
        position: new google.maps.LatLng(
          this.state.locationTrue[0],
          this.state.locationTrue[1]
        ),
        map: map,
        icon: pinImage,
        shadow: pinShadow
    });

    google.maps.event.addListener(userMarker, 'click', function() {
      infowindow.setContent('<div><strong>' + "Your Location" + '</strong><br></div>');
      map.setCenter(userMarker.getPosition());
      infowindow.open(map, this);
    });


    //////////////////////////////////////////
    const createMarker = (place) => {
      let placeLoc = place.geometry.location;
      let marker = new google.maps.Marker({
        map: map,
        position: placeLoc
      });
      // listener for markers clicked
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
          place.vicinity + '</div>');
        infowindow.open(map, this);
      });
    }

    // creates markers for all results
    for (var i = 0; i < data.length; i++) {
      createMarker(data[i]);
    }

    // var userLocation = new google.maps.LatLng(this.state.locationTrue[0], this.state.locationTrue[1]);
    //
    // var userWindow = new google.maps.InfoWindow({
    //     map: map,
    //     position: userLocation,
    //     content:
    //       '<div><strong>' + "Your Location" + '</strong><br></div>'
    //         // '<h1>Location pinned from HTML5 Geolocation!</h1>' +
    //         // '<h2>Latitude: ' + this.state.locationTrue[0] + '</h2>' +
    //         // '<h2>Longitude: ' + this.state.locationTrue[1] + '</h2>'
    // });

    // var userMarker = new google.maps.Marker({
    //   position: userLocation,
    //   map: map,
    //   icon: im
    // });

  }
  startMap() {
    let map;
    let infowindow;
    let start;
    infowindow = new google.maps.InfoWindow();

    let initMap = () => {
      start = {
        lat: this.state.locationTrue[0],
        lng: this.state.locationTrue[1]
      };

      map = new google.maps.Map(document.getElementById('map'), {
        center: start,
        zoom: 15,
        // draggable: false,
        // streetViewControl: false
      });
      this.setState({ map: map });

      google.maps.event.addListener(map, "idle", function(){
        google.maps.event.trigger(map, 'resize');
        // map.setCenter(start);
      });
    }

    initMap();




    // create user location's marker
    //////////////////////////////////////////
    // let pinColor = "FE7569";  // bright red
    let pinColor = "2599FF"; // bright blue

    let pinImage = new google.maps.MarkerImage(
      "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
      new google.maps.Size(21, 34),
      new google.maps.Point(0,0),
      new google.maps.Point(10, 34)
    );

    let pinShadow = new google.maps.MarkerImage(
      "http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
      new google.maps.Size(40, 37),
      new google.maps.Point(0, 0),
      new google.maps.Point(12, 35)
    );

    let userMarker = new google.maps.Marker({
        position: new google.maps.LatLng(
          this.state.locationTrue[0],
          this.state.locationTrue[1]
        ),
        map: map,
        icon: pinImage,
        shadow: pinShadow
    });

    // comment the line below to disable my location button
    addYourLocationButton(map, userMarker);

    // google.maps.event.addListener(userMarker, 'click', function() {
    //   map.setCenter(userMarker.getPosition());
    // });

    google.maps.event.addListener(userMarker, 'click', function() {
      infowindow.setContent('<div><strong>' + "Your Location" + '</strong><br></div>');
      infowindow.open(map, userMarker);
    });

    // google.maps.event.addListener(userMarker, 'mouseout', function(){
    //     infowindow.close();
    //  });
    function addYourLocationButton(map, marker) {
    	var controlDiv = document.createElement('div');

    	var firstChild = document.createElement('button');
    	firstChild.style.backgroundColor = '#fff';
    	firstChild.style.border = 'none';
    	firstChild.style.outline = 'none';
    	firstChild.style.width = '28px';
    	firstChild.style.height = '28px';
    	firstChild.style.borderRadius = '2px';
    	firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
    	firstChild.style.cursor = 'pointer';
    	firstChild.style.marginRight = '10px';
    	firstChild.style.padding = '0px';
    	firstChild.title = 'Your Location';
    	controlDiv.appendChild(firstChild);

    	var secondChild = document.createElement('div');
    	secondChild.style.margin = '5px';
    	secondChild.style.width = '18px';
    	secondChild.style.height = '18px';
    	secondChild.style.backgroundImage = 'url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-1x.png)';
    	secondChild.style.backgroundSize = '180px 18px';
    	secondChild.style.backgroundPosition = '0px 0px';
    	secondChild.style.backgroundRepeat = 'no-repeat';
    	secondChild.id = 'you_location_img';
    	firstChild.appendChild(secondChild);

    	// google.maps.event.addListener(map, 'dragend', function() {
    	// 	$('#you_location_img').css('background-position', '0px 0px');
    	// });

    	firstChild.addEventListener('click', function() {
    		// var imgX = '0';
    		// var animationInterval = setInterval(function(){
    		// 	if(imgX == '-18') imgX = '0';
    		// 	else imgX = '-18';
    		// 	$('#you_location_img').css('background-position', imgX+'px 0px');
    		// }, 500);
    		// if(navigator.geolocation) {
    		// 	navigator.geolocation.getCurrentPosition(function(position) {
    		// 		var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    		// 		marker.setPosition(latlng);
    		// 		map.setCenter(latlng);
    		// 		clearInterval(animationInterval);
    		// 		$('#you_location_img').css('background-position', '-144px 0px');
    		// 	});
    		// }
    		// else{
          map.setCenter(start);
    			// clearInterval(animationInterval);
    			// $('#you_location_img').css('background-position', '0px 0px');
    		// }
    	});

    	controlDiv.index = 1;
    	map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
    }

  }
  render() {
    let hiddenStyle = {
      display: "none"
    };
    let showStyle = {
      display: "inline"
    };
    let mainStyle = {
      // width: "25%",
      // border: "2px dotted purple",
      // margin: "8px",
      // float: "left",
      // overflow: "scroll"
      // width: "100%",
      // height: "100%"

      // display: "WebkitFlex",
      // display: "flex",
      // WebkitFlexDirection: "column",
      // flexDirection: "column",
      // WebkitAlignItems: "flex-start",
      // alignItems: "flex-start",
    };
    let mapStyle = {
      height: "100%",
      width: "100%",
      // border: "1px solid black",
      // marginTop: "25px"
    };

    let selectStyle = {
      width: "100%",
      // position: "absolute",
      zIndex: "1",
      height: "25px",
      WebkitAppearance: "none",
      MozAppearance: "none",
      appearance: "none",
      WebkitBorderRadius: "0",  // Safari 3-4, iOS 1-3.2, Android 1.6-
      MozBorderRadius: "0",  // Firefox 1-3.6
      borderRadius: "0"  //Opera 10.5, IE 9, Safari 5, Chrome, Firefox 4, iOS 4, Android 2.1+
    };

    if(this.state.locationTrue) {
      return (
        <div style={this.state.canPush ? _.extend(_.clone(mainStyle), showStyle) : _.extend(_.clone(mainStyle), showStyle)}>
            <select style={selectStyle} onChange={this.handleSelectChange.bind(this)}>
              <option disabled selected value> -- Select Category -- </option>
              <option value="bar">Bars</option>
              <option value="restaurant">Restaurants</option>
              <option value="gym">Gyms</option>
              <option value="cafe">Cafés</option>
              <option value="bakery">Bakeries</option>
            </select>
            <div style={mapStyle} id="map"></div>
        </div>
      );
    } else {
      return (
        <div>
          <p>Getting Your Location, Please Wait</p>
        </div>
      );
    }
  }
}

export default Nearby;
