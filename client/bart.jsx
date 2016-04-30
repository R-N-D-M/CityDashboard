import React, { PropTypes } from 'react';
import axios from 'axios';
import xmlToJson from './xmlToJson.js';

class Bart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationTrue: ["Waiting on location data (async delay)...", "Waiting on location data (async delay)..."],
      myValue: 'set ZAK This',
      nextTrains: [1]
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
        console.log("/bart post succeeded: ", response.data[0]);
        this.setState(
          response.data
        );
        console.log("this state in getClosestStation: ", this.state);
      })
      .catch( (response) => {
        console.log("Error getting station: ", response);
      });
  }

  componentDidMount() {
    console.log('bart component will mount');
    // this.getListOfStations();
    this.getClosestStation();
    // console.log("stations list: ", stations);
    // let delays = this.getBartDelays();
    // this.setState({ 
    //   // myValue: delays,
    //   otherValue: stations
    // });
  }


  // getBartDelays() {
  //   let base = "http://api.bart.gov/api/bsa.aspx?cmd=bsa&key=MW9S-E7SL-26DU-VV8V&date=today";
  //   return axios.get(base)
  //     .then((response) => {
  //       console.log('response.data: ', response.data);
  //       console.log('response is: ', response);
  //       let testJson = xmlToJson(response.request.responseXML.documentElement);
  //       console.log('testJson: ', testJson)
  //       this.setState({
  //         myValue: testJson
  //       })
  //     })
  //     .catch(function(response) {
  //       if (response instanceof Error){
  //         console.log('Error', response.message);
  //       } else {
  //         console.log(response.data);
  //       }
  //     });
  // }

  render() {
    if (!this.state.myValue) {
      return <div></div>;
    } else {
      return (
        <div className='bart'>
          <p>{this.state.myValue}</p>
          <div className="locationTrue">Lat: {this.state.locationTrue[0]} Long: {this.state.locationTrue[1]}</div>
          <div className="locationTrue">bartArr: {this.state.bartArr}</div>
          <div className="nextTrains">{this.state}</div>
        </div>
      );
    }
  }
}
Bart.propTypes = {

};

export default Bart;
