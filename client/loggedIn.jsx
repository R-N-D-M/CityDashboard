// import React from 'react';
// import ReactDOM from 'react-dom';
// import {ref} from './helpers/constants';
// import Main from './main';

// class LoggedIn extends React.Component{
//   constructor(props) {
//     super(props);

//     this.state = {profile: null}
//     this.onLogout = this.onLogout.bind(this);
//   } 

//   onLogIn(userID, profile) {
//     ref.child(`users/${userID}`).set(profile)
//   }

//   onLogout() {
//     console.log('bro wtf')
//     localStorage.removeItem('userToken');
//     window.location.href= "/";
//   }

//   componentDidMount() {
//     // In this case, the lock and token are retrieved from the parent component
//     // If these are available locally, use `this.lock` and `this.idToken`
//     this.props.lock.getProfile(this.props.idToken, function (err, profile) {
//       if (err) {
//         console.log("Error loading the Profile", err);
//         return;
//       }
//       else {
//         this.onLogIn(profile.user_id, profile);
//         this.setState({profile});
//       }
//     }.bind(this));
//   }

//   render() {
//     if (this.state.profile) {
//       return (
//         <div>
//           <h2>Welcome {this.state.profile.nickname}</h2>
//           <a onClick={this.onLogout}>Logout</a>
//         </div>
//       );
//     } else {
//       return (
//         <div className="loading">Loading profile</div>
//       );
//     }
//   }
// };

// export default LoggedIn;