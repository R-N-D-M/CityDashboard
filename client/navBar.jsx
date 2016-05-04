import React, { PropTypes } from 'react';
import WidgetList from './widgetList';
import {ref} from './helpers/constants';
import Main from './main';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
     this.state = {profile: null};
     this.showLock = this.showLock.bind(this);
     this.onLogout = this.onLogout.bind(this);
  }
  showLock() {
    this.props.lock.show();
  }
  onLogIn(userID, profile) {
    ref.child(`users/${userID}`).set(profile)
  }
  onLogout() {
    localStorage.removeItem('userToken');
    window.location.href= "/";
  }
  componentDidMount() {
    this.props.lock.getProfile(this.props.idToken, function (err, profile) {
      if (err) {
        console.log("Error loading the Profile", err);
        return;
      }
      else {
        this.onLogIn(profile.user_id, profile);
        this.setState({profile});
      }
    }.bind(this));
  }
  render() {
    if(this.state.profile) {
      console.log('the profile', this.state.profile)
      return (
        <nav className="navbar navbar-dark bg-inverse">
          <h1 className="navbar-brand">City Dashboard - San Francisco</h1>
          <div className="nav navbar-nav">
            <WidgetList widgets={this.props.widgets} handleClick={ this.props.handleClick } />
          </div>
          <div className="login-box">
            <a onClick={this.onLogout}>Logout</a>
          </div>
        </nav>
      )
    }
    else {
      return (
        <nav className="navbar navbar-dark bg-inverse">
          <h1 className="navbar-brand">City Dashboard - San Francisco</h1>
          <div className="nav navbar-nav">
            <WidgetList widgets={this.props.widgets} handleClick={ this.props.handleClick } />
          </div>
          <div className="login-box">
            <a onClick={this.showLock}>Sign In</a>
          </div>
        </nav>
      )
    }
    // return (
    //   <nav className="navbar navbar-dark bg-inverse">
    //     <h1 className="navbar-brand">City Dashboard - San Francisco</h1>
    //     <div className="nav navbar-nav">
    //       <WidgetList widgets={this.props.widgets} handleClick={ this.props.handleClick } />
    //     </div>
    //     <div className="login-box">
    //       <a onClick={this.showLock}>Sign In</a>
    //     </div>
    //   </nav>
    // );
  }
}
