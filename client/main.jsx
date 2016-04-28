// ES6 SYNTAX FOR IMPORTING MODULES
import React from 'react';
import ReactDOM from 'react-dom';
// import { Router, Router, hashHistory } from 'react-router';
// import About from './about';
// import Repos from './repo'

// ES6 SYNTAX FOR IMPORTING CUSTOM EXPORTS FROM A MODULE
// import { SOUND_CLOUD_KEY } from './config';
// import Compass from './compass';
import Weather from './weather';
import Inner from './inner';

// WEBPACK syntax TO LOAD CSS/SASS FILES INTO APP
require('./styles.scss')


// ES6 CLASS SYNTAX TO CREATE A REACT COMPONENT
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
        <Inner />
        <div className="bothcontainer" style={{display: "flex", width: "100%", height: "100%"}}>
          <div style={{width: "80%", height: "80%", flex: "1", border: "1px solid red"}} id={'widgets'}>
            <Weather location={this.state.locationTrue}/>
            </div>
          <div style={{width: "20%", height: "80%", border: "1px solid blue"}} id={'controlPanel'}>Control Panel</div>
        </div>
      </div>
    );
  }
}

// <Bart />

ReactDOM.render(<App />, document.getElementById('app'));
