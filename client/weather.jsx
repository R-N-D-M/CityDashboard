// app id 9fb12d07534f5cbab4ff6c758a01f407
import React from 'react';
import Axios from 'axios';

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appid: "9fb12d07534f5cbab4ff6c758a01f407",
      // location: [37.787507, -122.399838],
      locationTrue: ["Waiting on location data (async delay)...", "Waiting on location data (async delay)..."],
      city: "No weather information yet.",
      description: "No weather information yet.",
      temp: "No weather information yet.",
      temp_max: "No weather information yet.",
      temp_min: "No weather information yet.",
      humidity: "No weather information yet.",
      pressure: "No weather information yet.",
      winddeg: "No weather information yet.",
      windspeed: "No weather information yet."
    };
  }
  componentWillMount() {
    console.log('Weather component will mount!');
  }
  componentDidMount() {
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition( (position) => {
    //     console.log(position);
    //     let lat = position.coords.latitude;
    //     let lng = position.coords.longitude;
    //     this.setState({
    //       locationTrue: [lat, lng]
    //     });
    //     this.getWeather();
    //   });
    // }

    console.log('Weather component mounted');
  }
  componentWillReceiveProps(nextProps) {
    console.log("Weather component received prop change!");
    if(nextProps && nextProps.location[0] != this.state.locationTrue[0] && nextProps.location[1] != this.state.locationTrue[1]) {
      // console.log("np", nextProps.location);
      this.setState({locationTrue: nextProps.location}, () => {
        // console.log("nl", this.state.locationTrue);
        this.getWeather();
      });

    }

  }
  getWeather() {
    let url = "http://api.openweathermap.org/data/2.5/weather?lat=" + this.state.locationTrue[0] + "&lon=" + this.state.locationTrue[1] + "&appid=" + this.state.appid;

    // console.log("url: ", url);

    Axios.get(url)
      .then( (response) => {
        console.log("Weather: ", response);
        this.setState({
          city: response.data.name,
          description: response.data.weather[0].description,
          temp: response.data.main.temp,
          temp_max: response.data.main.temp_max,
          temp_min: response.data.main.temp_min,
          humidity: response.data.main.humidity,
          pressure: response.data.main.pressure,
          winddeg: response.data.wind.deg,
          windspeed: response.data.wind.speed
        });
      })
      .catch( (response) => {
        console.log("Error getting weather: ", response);
      });

  }
  render() {
    return (
      <div style={{
          width: "25%",
          border: "2px dotted green",
          margin: "8px",
          float: "left"
        }}>

        <div className="locationTrue">Lat: {this.state.locationTrue[0]} Long: {this.state.locationTrue[1]}</div>
        <div className="city">Current City: {this.state.city}</div>
        <div className="description">Weather: {this.state.description}</div>
        <div className="currentTemp">Current Temperature(Kelvins): {this.state.temp}</div>
        <div className="maxTemp">Max Temperature(Kelvins): {this.state.temp_max}</div>
        <div className="minTemp">Min Temperature(Kelvins): {this.state.temp_min}</div>
        <div className="humidity">Humidity: {this.state.humidity}</div>
        <div className="pressure">Pressure: {this.state.pressure}</div>
        <div className="winddegree">Wind(Degrees): {this.state.winddeg}</div>
        <div className="windspeed">Wind Speed(mph): {this.state.windspeed}</div>
      </div>
    );
  }

}

export default Weather;
