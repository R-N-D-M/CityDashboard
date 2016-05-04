import React from 'react';
import ReactDOM from 'react-dom';

import Main from './main';

require('./styles/styles.scss');
require('./styles/reactgridlayout.css');
require('./styles/reactresizeable.css');

const App = () => {
  return <Main />;
}

ReactDOM.render(<App />, document.getElementById('app')
);
