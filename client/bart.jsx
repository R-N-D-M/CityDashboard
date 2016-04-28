
// should display the next train leaving from your current location
  // outbound
  // inbound
// poll google for closest bart station based upon current location
// 
import React, { PropTypes } from 'react';
import axios from 'axios';
import xmlToJson from './xmlToJson.js';

class Bart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myValue: 'set ZAK This'
    }
    //props.alert("bart");
  }

  getClosestStation(){
    const R = 6371000; // metres
    let φ1 = lat1.toRadians();
    let φ2 = lat2.toRadians();
    let Δφ = (lat2-lat1).toRadians();
    let Δλ = (lon2-lon1).toRadians();

    let a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c;
    return d;
  }
  
  getListOfStations(){
    const base = 'http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V';
    return axios.get(base)
      .then((response) => {
        return response.data
      })
      .catch((response) => {
        if (response instanceof Error){
          console.log('Error: ', response.message);
        } else {
          console.log(response.data);
        }
      });
  }
  
  componentWillMount(){
    console.log('bart component will mount');
    const stations = getListOfStations();
    console.log("stations list: ", stations);
    // let delays = getBartDelays();
    // this.setState({ myValue: delays });
  }

  getBartDelays(){
    let base = "http://api.bart.gov/api/bsa.aspx?cmd=bsa&key=MW9S-E7SL-26DU-VV8V&date=today";
    axios.get(base)
      .then((response) => {
        console.log('response.data: ', response.data);
        console.log('response is: ', response);
        let testJson = xmlToJson(response.request.responseXML.documentElement);
        console.log('testJson: ', testJson)
        this.setState({
          myValue: testJson
        })
      })
      .catch(function(response) {
        if (response instanceof Error){
          console.log('Error', response.message);
        } else {
          console.log(response.data);
        }
      });
  }

  render() {
    if (!this.state.myValue) {
      return <div></div>;
    } else {
      return (
        <div className='bart'>
          <p>{this.state.myValue}</p>
        </div>
      );
    }
  }
}
Bart.propTypes = {

};

export default Bart;
