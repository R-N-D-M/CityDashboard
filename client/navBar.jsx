import React, { PropTypes } from 'react';

import WidgetList from './widgetList';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {

    return (
      <nav className="navbar navbar-dark bg-inverse">
        <h1 className="navbar-brand">City Dashboard - San Francisco</h1>
        <div className="nav navbar-nav">
          <WidgetList widgets={this.props.widgets} handleClick={ this.props.handleClick } />
        </div>
      </nav>
    );
  }
}
