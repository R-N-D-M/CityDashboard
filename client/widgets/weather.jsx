import React from 'react';
import Axios from 'axios';
import Moment from 'moment';

export default class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationTrue: this.props.location,
      city: "No weather information yet.",
      description: "No weather information yet.",
      icon: null,
      temp: "No weather information yet.",
      humidity: "No weather information yet.",
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
          humidity: response.data.humidity,
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
        <div className="card stylish-card hoverable card card-block card text-xs-center" style={{backgroundColor: '#373a3c',overflowY: 'scroll'}}>
          <div className='card-text' className="city" style={{fontSize: '125%',fontWeight: 'bold', color: '#eceeef',textShadow: 'black'}}>{this.state.city}</div>
          <div className='card-text' className="currentTemp" style={{color: '#eceeef', textShadow: 'black', fontSize: '250%', textDecoration: 'underline overline'}}>{Math.round(((this.state.temp - 273.15)*9/5)+32) + '°' + 'F'}</div>
          <div className='card-text' className="description" style={{fontWeight: 'bold', color:'#eceeef', textShadow: 'black',textTransform: 'capitalize'}}>{this.state.description}<div style={{width:'2em', height:'1.4em', verticleAlign: 'middle', marginLeft: '0em', display: 'inline-block', overflow:'hidden', backgroundPosition: 'center', position: 'absolute', marginTop: '3px', backgroundImage: 'url('+iconURL+')'}}></div></div>
          <div className='card-text' className="humidity" style={{fontWeight: 'bold', color:'#eceeef', textShadow: 'black'}}>Humidity: {this.state.humidity + '%'}</div>
          <div className='card-text' className="windspeed" style={{fontWeight: 'bold', color: '#eceeef', textShadow: 'black'}}>Wind Speed: {this.state.windspeed + 'mph'}</div>
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
