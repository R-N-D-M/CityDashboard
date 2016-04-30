
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

  componentWillMount(){
    let delays = this.getBartDelays();
    this.setState({ myValue: delays });
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
        <div className='bartDelays'>
          <p>{this.state.myValue}</p>
        </div>
      );
    }
  }
}
// Bart.propTypes = {

// };

export default Bart;
