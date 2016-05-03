import React from 'react';
import Axios from 'axios';
import _ from 'lodash';

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
    infowindow = new google.maps.InfoWindow();

    let initMap = () => {
      let start = {
        lat: this.state.locationTrue[0],
        lng: this.state.locationTrue[1]
      };

      map = new google.maps.Map(document.getElementById('map'), {
        center: start,
        zoom: 15
      });
      this.setState({ map: map });

      google.maps.event.addListener(map, "idle", function(){
        google.maps.event.trigger(map, 'resize');
        map.setCenter(start);
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
      infowindow.open(map, this);
    });
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
      width: "100%",
      height: "100%"
    };
    let mapStyle = {
      height: "100%",
      width: "100%",
      border: "1px solid black"
    };

    return (
      <div style={this.state.canPush ? _.extend(_.clone(mainStyle), showStyle) : _.extend(_.clone(mainStyle), showStyle)}>
        <select style={{width: "100%"}} onChange={this.handleSelectChange.bind(this)}>
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
  }

}

export default Nearby;

// <button onClick={this.handleClick.bind(this)}>Push this button</button>

// return (
//   <div style={this.state.canPush ? showStyle : hiddenStyle}>
//     <button onClick={this.handleClick.bind(this)}>Push this button</button>
//   </div>
// );


// let maybeButton = "Not yet!";
// if (this.state.canPush) {
// //  alert(this.state.canPush);
//  maybeButton = <button onClick={this.handleClick.bind(this)}>Push this button</button>;
// maybeButton = "yoyoyo";
// }
