import React, { PropTypes } from 'react';
import axios from 'axios';
import xmlToJson from './xmlToJson.js';

class Bart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationTrue: ["Waiting on location data (async delay)...", "Waiting on location data (async delay)..."],
      myValue: 'set ZAK This',
      nextTrains: []
    };
  }


  componentWillReceiveProps(nextProps) {
    console.log('bart component received prop change!');
    if(nextProps && nextProps.location[0] != this.state.locationTrue[0] && nextProps.location[1] != this.state.locationTrue[1]) {
      this.setState({locationTrue: nextProps.location}, () => {
        // this.getListOfStations();
        this.getClosestStation();
      });
    }
  }

  getClosestStation() {
    let url = '/bart';
    let dataToSend = {
      latLng: this.state.locationTrue
    };
    axios.post(url, dataToSend)
      .then( (response) => {
        console.log("/bart post succeeded: ", response.data);
        this.setState({
          nextTrains: response.data
        });
        console.log("this state in getClosestStation: ", this.state);
      })
      .catch( (response) => {
        console.log("Error getting station: ", response);
      });
  }

  componentDidMount() {
    console.log('bart component will mount');
    this.getClosestStation();
  }

  render() {

    let TrainsData;
    let that = this;
    // console.log("this", that); 
    console.log("IN REDNER: this.state", that.state.nextTrains);

    if(that.state.nextTrains.length > 0){
      TrainsData = that.state.nextTrains.map((trains) => {
        return (
          <div>
            <div className="destinations">Destination: {trains.destination}</div>
            <div className="directions">Direction: {trains.direction}</div>
            <div className="platforms">Platform #: {trains.platform}</div>
            <div className="times">Minutes Until: {trains.time}</div>
          </div>
        );
      });
      console.log("trainsData", TrainsData);
    }

    if (!this.state.myValue) {
      return <div></div>;
    } else {
      return (
         <div className='bart'style={{
          width: "25%",
          border: "2px dotted green",
          margin: "8px",
          float: "left"
        }}>
          <p>{this.state.myValue}</p>
          <div className="TrainsData">{TrainsData}</div>
        </div>
      );
    }
  }
}
Bart.propTypes = {

};

export default Bart;
