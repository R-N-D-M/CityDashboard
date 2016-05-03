import React from 'react';
import Axios from 'axios';

class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationTrue: this.props.location,
      response: 'no movie data'
    };
  }
  componentWillMount() {
    // console.log('Movies Component Will Mount!')

  }
  componentDidMount() {
    if(this.state.locationTrue) {
      this.getMovies();
    }
  }
  componentWillReceiveProps(nextProps) {
    // console.log("Movies component received prop change!");
    if(nextProps && nextProps.location && nextProps.location[0] != this.state.locationTrue[0] && nextProps.location[1] != this.state.locationTrue[1]) {
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
    // console.log(data);
    Axios.post(url, data)
      .then( (response) => {
        // console.log('/movie post works', response.data);
        let res = Object.keys(response.data).map((theatreName, theatreIndex) => {
          let movieAndShowtimes = response.data[theatreName];
          let eachMovie = movieAndShowtimes.map((movie, index) => (
            <div key={index}>
              <div>{movie.title}</div>
              <div>{movie.showtimes}</div>
            </div>
          ));
          return (
          <div key={theatreIndex}>
            <div>{theatreName}</div>
            {eachMovie}
          </div>)
      })
      this.setState({
        response: res
      });
    })
      .catch( (response) => {
        console.log('Error getting movies: ', response);
      });
  }
  render() {

    return (
      <div style={{
        width: "40%",
        border: "2px dotted green",
        margin: "8px",
        float: "left"
        }}>

      {this.state.response}
      </div>
    );
  }
}

export default Movies;
