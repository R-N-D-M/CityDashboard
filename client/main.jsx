import React from 'react';
import _ from 'underscore';
import NavBar from './navBar';
import Weather from './weather';
import Bart from './bart';
import Nearby from './nearby';
import Movies from './movies';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationTrue: ["Waiting on location data (async delay)...", "Waiting on location data (async delay)..."]
    };
    this.state.widgets = {
      weather: {
        id: 'weather',
        name: 'Weather',
        deployed: true,
        makeFunction: this.makeWeather
      },
      bart: {
        id: 'bart',
        name: 'Bart',
        deployed: false,
        makeFunction: this.makeBart
      },
      nearby: {
        id: 'nearby',
        name: 'Nearby',
        deployed: false,
        makeFunction: this.makeNearby
      },
      movies: {
        id: 'movies',
        name: 'Movies',
        deployed: false,
        makeFunction: this.makeMovies
      }
    };
    this.makeBart = this.makeBart.bind(this);
    this.makeNearby = this.makeNearby.bind(this);
    this.makeWeather = this.makeWeather.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( (position) => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        this.setState({
          locationTrue: [lat, lng]
        });
      });
    }
  }
  handleClick(id) {
    this.state.widgets[id].deployed = true;
  }
  makeBart(context) {
    return <Bart alert={ context.state.locationTrue }/>;
  }
  makeWeather(context) {
    return <Weather location={ context.state.locationTrue } />;
  }
  makeNearby(context) {
    return <Nearby location={ context.state.locationTrue } />
  }
  makeMovies(context) {
    return <Movies location={ context.state.locationTrue } />
  }
  render() {
    let widgets = [];
    _.each(this.state.widgets, (widget) => {
      if(widget.deployed) {
        widgets.push(widget.makeFunction(this));
      }
    });
    return (
      <div style={{height: window.innerHeight*1.1}} className="container-fluid">
        <NavBar style={{paddingLeft: '0px', marginLeft: '0px'}} widgets={this.state.widgets} handleClick={ this.handleClick }/>
        <div className="container-fluid" style={{backgroundColor: 'red'}}>
          {widgets}
        </div>
      </div>

    );
  }
}
