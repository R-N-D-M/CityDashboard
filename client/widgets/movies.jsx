import React from 'react';
import Axios from 'axios';
import Moment from 'moment';
//qk93ft2mkdfavw8abjr4yy9b

class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationTrue: this.props.location,
      response: 'Getting Your Location, Please Wait'
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
              <div style={{fontWeight: 'bold'}}>{movie.title}</div>
              <div><span style={{fontWeight: 'bold'}}>Showtimes:</span> {movie.showtimes.map((time) => {
                return Moment(time).format("h:mma ")
              })}</div>
            </div>
          ));
          return (
          <div key={theatreIndex}>
            <div style={{fontSize: 16, fontWeight: 'bold',  borderBottom: '1px solid #000', paddingBottom: '2px', textAlign: 'center'}}>{theatreName}</div>
            <div>{eachMovie}</div>
            <br/>
          </div>
          )
        })
      this.setState({
        response: res.slice(0,2)
      });
    })
      .catch( (response) => {
        console.log('Error getting movies: ', response);
      });
  }
  render() {
    if(this.state.locationTrue) {
      return (
        <div className='drag card' style={{color: 'black', height: '100%', width:'100%'}}>
            <div className="card card-block card-text drag" style={{overflowY: 'auto', height: '100%', width:'100%', backgroundImage: 'url("http://www.designbolts.com/wp-content/uploads/2013/02/Rough-Grey-Tilable-Pattern-For-Website-Background.jpg")'}}>{this.state.response}</div>
        </div>
      )
    }
    else {
      return (
        <div style={{backgroundImage: 'url("http://www.designbolts.com/wp-content/uploads/2013/02/Rough-Grey-Tilable-Pattern-For-Website-Background.jpg")', height: '100%'}}>
          <p>Getting Your Location, Please Wait</p>
        </div>
      );
    }
  }
}

export default Movies;
