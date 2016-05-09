import React from 'react';
import Axios from 'axios';

export default class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationTrue: this.props.location,
      city: "No weather information yet.",
      description: "No weather information yet.",
      icon: null,
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
    if(this.state.locationTrue) {
      this.getWeather();
    }
  }
  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
    // console.log("Weather component received prop change!");
    if(nextProps && nextProps.location && nextProps.location[0] != this.state.locationTrue[0] && nextProps.location[1] != this.state.locationTrue[1]) {
      // console.log("np", nextProps.location);
      this.setState({locationTrue: nextProps.location}, () => {
        // console.log("nl", this.state.locationTrue);
        this.getWeather();
      });

    }
  }

  getWeather() {
    let url = '/weather';
    let dataToSend = {
      latLng: this.state.locationTrue
    };
    Axios.post(url, dataToSend)
      .then( (response) => {
        // console.log("/weather post succeeded: ", response.data);
        this.setState({
          city: response.data.city,
          description: response.data.description,
          icon: response.data.icon,
          temp: response.data.temp,
          temp_max: response.data.temp_max,
          temp_min: response.data.temp_min,
          humidity: response.data.humidity,
          pressure: response.data.pressure,
          winddeg: response.data.winddeg,
          windspeed: response.data.windspeed
        });
        // window.localstorage.weather = this.state;
        // console.log("This state: ", this.state);
      })
      .catch( (response) => {
        console.log("Error getting weather!");
    });
  }
  render() {

    let weatherStyle = {
        // width: "350px",
        // height: '300px',
        // border: "2px dotted green",
        // margin: "8px",
        // float: "left"
      };

    let iconURL = this.state.icon ? "http://openweathermap.org/img/w/" + this.state.icon + ".png" : null;

    if(this.state.locationTrue){
      return (
        <div style={weatherStyle}>
          <div className="locationTrue">Lat: {this.state.locationTrue[0]} Long: {this.state.locationTrue[1]}</div>
          <div className="city">Current City: {this.state.city}</div>
          <div className="description">Weather: {this.state.description} <img className="weathericon" src={iconURL}/></div>
          <div className="currentTemp">Current Temperature(Kelvins): {this.state.temp}</div>
          <div className="maxTemp">Max Temperature(Kelvins): {this.state.temp_max}</div>
          <div className="minTemp">Min Temperature(Kelvins): {this.state.temp_min}</div>
          <div className="humidity">Humidity: {this.state.humidity}</div>
          <div className="pressure">Pressure: {this.state.pressure}</div>
          <div className="winddegree">Wind(Degrees): {this.state.winddeg}</div>
          <div className="windspeed">Wind Speed(mph): {this.state.windspeed}</div>
          <div className="windspeed">Wind Speed(mph): {this.state.windspeed}</div>
        </div>
      );
    }
    else {
      return (
        <div style={weatherStyle}>
          <p>Getting Your Location, Please Wait</p>
        </div>
      );
    }

  }

}
