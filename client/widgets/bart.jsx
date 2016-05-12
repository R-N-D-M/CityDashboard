import React, { PropTypes } from 'react';
import axios from 'axios';

class Bart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationTrue: this.props.location,
      nextTrains: [],
      originStation: '',
      imgUrl: '/assets/fail.jpg',
      error: false,
      lastUpdated: this.timeStamp()
    };
    this.getClosestStation = this.getClosestStation.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps && nextProps.location && nextProps.location[0] != this.state.locationTrue[0] && nextProps.location[1] != this.state.locationTrue[1]) {
      this.setState({locationTrue: nextProps.location}, () => {
        this.getClosestStation();
      });
    }
  }
  
  timeStamp() {
  // Create a date object with the current time
    let now = new Date();
  // Create an array with the current month, day and time
    let date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];
  // Create an array with the current hour, minute and second
    let time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];
  // If seconds and minutes are less than 10, add a zero
    for ( let i = 1; i < 3; i++ ) {
      if ( time[i] < 10 ) {
        time[i] = "0" + time[i];
      }
    }
  // Return the formatted string
    return date.join("/") + " " + time.join(":");
  }

  getClosestStation() {
    let url = '/bart';
    let dataToSend = {
      latLng: this.state.locationTrue
    };
    axios.post(url, dataToSend)
      .then( (response) => {
        this.setState({
          nextTrains: response.data.deptArr,
          originStation: response.data.originStation.name,
          error: false,
          lastUpdated: this.timeStamp()
        });
      })
      .catch( (response) => {
        console.log("Error getting closest station from BART: ", response);
        this.setState({error: true});
        setTimeout(() => {
          this.getClosestStation();
        }, 500);
      });
  }

  componentDidMount() {
    if(this.state.locationTrue) {
      this.getClosestStation()
    }
  }

  componentWillMount(){
    setInterval(this.getClosestStation, 60000);  
  }

  componentWillUnmount(){
    this.timer = setInterval(clearInterval(this.timer));
    this.isUnmounted = true;
  }

  render() {
      let TrainsData;
      let that = this;
      if(that.state.nextTrains.length > 0){
        TrainsData = that.state.nextTrains.map((trains) => {
          return (
            <tr>
              <td>{trains.destination} </td>
              <td>{trains.direction} </td>
              <td>{trains.platform} </td>
              <td>{trains.time} </td>
            </tr>
          );
        });
      }
      if (this.state.error === true){
        return (
          <div>
            <img id='fail' src={this.state.imgUrl} style={{width: '100%'}}/>
          </div>
        );
      }
      if (!this.state.locationTrue) {
        return (
          <div>
            <p>Getting Your Location, Please Wait</p>
          </div>
        );
      } else {
        return (
          <div claaName='card'>
            <div className='card-header text-xs-center'>Departing from: {this.state.originStation}</div>
            <div className='TrainsData'>
              <table className='table table-sm table-responsive table-striped'>
                <tbody>
                  <thead className='thead-default'>
                    <tr>
                      <th style={{paddingRight:'50px'}}>Destinations: </th>
                      <th style={{paddingRight:'20px'}}>Direction: </th>
                      <th style={{paddingRight:'20px'}}>Platform #: </th>
                      <th>Minutes Until: </th>
                    </tr>
                  </thead>
                {TrainsData}
                </tbody>
              </table>
              <div className='card-footer'>Last updated at: {this.state.lastUpdated}</div>
            </div>
          </div>
        );
      }
    }
}
export default Bart;
