//THIS IS THE ENTRY POINT OF THE APPLICATION

// ES6 SYNTAX FOR IMPORTING MODULES
import React from 'react';
import ReactDOM from 'react-dom';

// ES6 SYNTAX FOR IMPORTING CUSTOM EXPORTS FROM A MODULE
// import { SOUND_CLOUD_KEY } from './config';
// import Controls from './controls';

// WEBPACK syntax TO LOAD CSS/SASS FILES INTO APP
require('./styles.scss')


// ES6 CLASS SYNTAX TO CREATE A REACT COMPONENT
class MyApp extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar nabar-light navbar-fixed-top bg-faded">
          <ul className="nav navbar-nav">
            <li>
              <h2>JukeBox</h2>
            </li>
          </ul>
        </nav>
        <div className="container">
          <Controls soundCloudKey={SOUND_CLOUD_KEY}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<MyApp />, document.getElementById('app'));
