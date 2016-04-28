import React from 'react';
import ReactDOM from 'react-dom';
// import { Router, Router, hashHistory } from 'react-router';
// import About from './about';
// import Repos from './repo'

import NavBar from './navBar';
import Weather from './weather';
import Bart from './bart';

require('./styles.scss')

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationTrue: ["Waiting on location data (async delay)...", "Waiting on location data (async delay)..."]
    };
  }
  componentWillMount() {
    console.log('Main component will mount!');
  }
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( (position) => {
        // console.log(position);
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        this.setState({
          locationTrue: [lat, lng]
        });
      });
    }
    console.log('Main component mounted');
  }
  render() {
    return (
      <div style={{height: "100%", width: "100%"}}>
        <NavBar />
        <div className="bothcontainer" style={{display: "flex", width: "100%", height: "100%"}}>
          <div style={{width: "100%", height: "80%", flex: "1", border: "1px solid red"}} id={'widgets'}>
            <Weather location={this.state.locationTrue}/>
            </div>
        </div>
        <Bart />
      </div>

    );
  }
}



ReactDOM.render(<App />, document.getElementById('app'));
