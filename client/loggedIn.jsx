import React from 'react';
import ReactDOM from 'react-dom';

class LoggedIn extends React.Component{
  getInitialState(){
    return {
      profile: null
    }
  } // maybe needs to be constructor instead of getInitialState

  // getFoos(){ 
  //   fetch('/dbconnections/signup', {
  //   headers: {
  //     'Authorization': 'Bearer ' + localStorage.getItem('userToken')
  //   },
  //     method: 'GET',
  //     cache: false
  //   });
  // }

  // getFoos.then(function (response) {
  //   response.json().then(function (foos) {
  //     console.log('the foos:', foos);
  //   });
  // });

  componentDidMount() {
    // In this case, the lock and token are retrieved from the parent component
    // If these are available locally, use `this.lock` and `this.idToken`
    this.props.lock.getProfile(this.props.idToken, function (err, profile) {
      if (err) {
        console.log("Error loading the Profile", err);
        return;
      }
      this.setState({profile: profile});
    }.bind(this));
  }



  render() {
    if (this.state.profile) {
      return (
        <h2>Welcome {this.state.profile.nickname}</h2>
      );
    } else {
      return (
        <div className="loading">Loading profile</div>
      );
    }
  }
};

export default LoggedIn;