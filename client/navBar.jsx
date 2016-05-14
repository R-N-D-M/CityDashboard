import React, { PropTypes } from 'react';
import WidgetList from './widgetList';
import {ref} from './helpers/constants';
import Main from './main';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
     this.state = {profile: this.props.profile || null};
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
      let avatar = null;
      let emailSpan = null;
      if(this.state.profile) {
        loginLogout = "Logout";
        loginLogoutAction = this.props.onLogout;
        avatar = <img className="avatar" src={this.state.profile.picture} style={{float:"right"}}/>
        emailSpan = <span style={{float:"right", verticalAlign: "middle"}}>{this.state.profile.email}</span>
      };

      return (
        <nav className="navbar navbar-dark bg-inverse">
          <h1 className="navbar-brand">City Dashboard - San Francisco</h1>
          <div className="nav navbar-nav">
            <WidgetList widgets={this.props.widgets} handleClick={ this.props.handleClick } />
            <div className="btn btn-secondary nav-item pull-xs-right">
              <a onClick={loginLogoutAction}>{loginLogout}</a>
            </div>
            {emailSpan}
            {avatar}
          </div>
        </nav>
      )
  }
}
