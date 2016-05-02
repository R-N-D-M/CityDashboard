import React, { PropTypes } from 'react';
import axios from 'axios';

class Bart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationTrue: ["Waiting on location data (async delay)...", "Waiting on location data (async delay)..."],
      nextTrains: []
    };
  }


  componentWillReceiveProps(nextProps) {
    if(nextProps && nextProps.location[0] != this.state.locationTrue[0] && nextProps.location[1] != this.state.locationTrue[1]) {
      this.setState({locationTrue: nextProps.location}, () => {
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
        this.setState({
          nextTrains: response.data
        });
      })
      .catch( (response) => {
      });
  }

  componentDidMount() {
    this.getClosestStation();
  }

  render() {
    let TrainsData;
    let that = this;
    if(that.state.nextTrains.length > 0){
      TrainsData = that.state.nextTrains.map((trains) => {
        return (
          <div>
            <span className="destinations">Destination: {trains.destination} </span>
            <span className="directions">Direction: {trains.direction} </span>
            <span className="platforms">Platform #: {trains.platform} </span>
            <span className="times">Minutes Until: {trains.time} </span>
          </div>
        );
      });
    }
    if (!this.state.locationTrue) {
      return <div></div>;
    } else {
      return (
         <div className='bart'style={{
          width: "50%",
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
export default Bart;
