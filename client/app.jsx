import React from 'react';
import ReactDOM from 'react-dom';

import Main from './main';

require('./styles.scss');
require('./reactgridlayout.css');
require('./reactresizeable.css');

const App = () => {
  return <Main />;
}

ReactDOM.render(<App />, document.getElementById('app'));
