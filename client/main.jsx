// ES6 SYNTAX FOR IMPORTING MODULES
import React from 'react';
import ReactDOM from 'react-dom';

// ES6 SYNTAX FOR IMPORTING CUSTOM EXPORTS FROM A MODULE
// import { SOUND_CLOUD_KEY } from './config';
// import Compass from './compass';
import Weather from './weather';
import Inner from './inner';

// WEBPACK syntax TO LOAD CSS/SASS FILES INTO APP
require('./styles.scss')


// ES6 CLASS SYNTAX TO CREATE A REACT COMPONENT
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div style={{height: "100%", width: "100%"}}>
        <Inner />
        <div className="bothcontainer" style={{display: "flex", width: "100%", height: "100%"}}>
          <div style={{width: "80%", height: "80%", flex: "1", border: "1px solid red"}} id={'widgets'}><Weather/></div>
          <div style={{width: "20%", height: "80%", border: "1px solid blue"}} id={'controlPanel'}>Control Panel</div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
