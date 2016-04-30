import React from 'react';
import Axios from 'axios';

class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationTrue: ["Waiting on location data (async delay)...", "Waiting on location data (async delay)..."]
    };
  }
  componentWillMount() {
    console.log('Movies Component Will Mount!')
  }
  componentDidMount() {
    console.log('Movies Component Mounted')
  }
  componentWillReceiveProps(nextProps) {
    console.log("Movies component received prop change!");
    if(nextProps && nextProps.location[0] != this.state.locationTrue[0] && nextProps.location[1] != this.state.locationTrue[1]) {
      this.setState({locationTrue: nextProps.location}, () => {
        // console.log(this.state.locationTrue)
        this.getMovies();
      });
      
    }
  }
  getMovies() {
    let url = '/movies';
    let data = {
      latLong: this.state.locationTrue
    };
    console.log(data);
    Axios.post(url, data)
      .then( (response) => {
        console.log('/movie post works', response.data);
        // this.setState({
        //   showtimes: response.data;
        // });
        // console.log("This state: ", this.state);
      })
      .catch( (response) => {
        console.log('Error getting movies: ', response);
      });
  }
  render() {

    return (
      <div></div>
    );
  }
}


export default Movies;