import React from 'react';
import ReactDOM from 'react-dom';

import Main from './main';

require('./styles/styles.scss');

const App = () => {
  return <Main />;
}

ReactDOM.render(<App />, document.getElementById('app')
);
