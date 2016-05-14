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
    this.getWeather = this.getWeather.bind(this);
  }
  componentWillMount() {
    setInterval(this.getWeather,900000);
  }
  componentDidMount() {
     if(this.state.locationTrue) {
      this.getWeather();
    }
  }
  componentWillUnmount() {
    this.times = setInterval(clearInterval(this.timer));
    this.unMounted = true;
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

    let iconURL = this.state.icon ? "http://openweathermap.org/img/w/" + this.state.icon + ".png" : null;

    if(this.state.locationTrue){
      return (
        <div className="card stylish-card hoverable card card-block card text-xs-center" style={{backgroundColor: '#373a3c',overflowY: 'scroll', height: '100%', width: '100%'}}>
          <div className='card-text' className="city" style={{fontSize: '125%',fontWeight: 'bold', color: '#eceeef',textShadow: 'black'}}>{this.state.city}</div>
          <div style={{marginBottom: '-20px', marginTop: '-10px'}}><img src={iconURL} style={{width: '22%'}}/></div>
          <div className='card-text' className="currentTemp" style={{color: '#eceeef', textShadow: 'black', fontSize: '250%', textDecoration: 'underline overline', marginTop: '5px'}}>{Math.round(((this.state.temp - 273.15)*9/5)+32) + '°' + 'F'}</div>
          <div className='card-text' className="description" style={{fontWeight: 'bold', color:'#eceeef', textShadow: 'black',textTransform: 'capitalize'}}>{this.state.description}</div>
          <div className='card-text' className="humidity" style={{fontWeight: 'bold', color:'#eceeef', textShadow: 'black'}}>Humidity: {this.state.humidity + '%'}</div>
          <div className='card-text' className="windspeed" style={{fontWeight: 'bold', color: '#eceeef', textShadow: 'black'}}>Wind Speed: {this.state.windspeed + 'mph'}</div>
        </div>
      );
    }
    else {
      return (
        <div>
          <p>Getting Your Location, Please Wait</p>
        </div>
      );
    }

  }

}
