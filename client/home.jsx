import React from 'react';
import ReactDOM from 'react-dom';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.showLock = this.showLock.bind(this);
  }
  showLock() {

    this.props.lock.show();
  }
  render() {
    return (
    <div className="login-box">
      <a onClick={this.showLock}>Sign In</a>
    </div>
    );
  }
}

export default Home;