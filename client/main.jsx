// ES6 SYNTAX FOR IMPORTING MODULES
import React from 'react';
import ReactDOM from 'react-dom';

// ES6 SYNTAX FOR IMPORTING CUSTOM EXPORTS FROM A MODULE
// import { SOUND_CLOUD_KEY } from './config';
import Inner from './inner';

// WEBPACK syntax TO LOAD CSS/SASS FILES INTO APP
require('./styles.scss')


// ES6 CLASS SYNTAX TO CREATE A REACT COMPONENT
class App extends React.Component {
  render() {
    return (
      <div>
        <Inner />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
