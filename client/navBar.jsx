import React, { PropTypes } from 'react';
import WidgetList from './widgetList';
import {ref} from './helpers/constants';
import Main from './main';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
     this.state = {profile: null};
     this.showLock = this.showLock.bind(this);
  }
  showLock() {
    this.props.lock.show();
  }
  componentDidMount() {
    this.props.lock.getProfile(this.props.idToken, function (err, profile) {
      if (err) {
        console.log("Error loading the Profile", err);
        return;
      }
      else {
        this.props.onLogin(profile.user_id, profile);
        this.setState({profile});
      }
    }.bind(this));
  }
  render() {
      console.log('the profile', this.state.profile)
      let loginLogout = "Login";
      let loginLogoutAction = this.showLock;
      if(this.state.profile) {
        loginLogout = "Logout";
        loginLogoutAction = this.props.onLogout;
      };

      return (
        <nav className="navbar navbar-dark bg-inverse">
          <h1 className="navbar-brand">City Dashboard - San Francisco</h1>
          <div className="nav navbar-nav">
            <WidgetList widgets={this.props.widgets} handleClick={ this.props.handleClick } />
          </div>
          <div className="btn btn-secondary nav-item active pull-xs-right">
            <a onClick={loginLogoutAction}>{loginLogout}</a>
          </div>
        </nav>
      )
  }
}
