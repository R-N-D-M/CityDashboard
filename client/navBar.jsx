import React, { PropTypes } from 'react';

import WidgetList from './widgetList';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div style={{textAlign: 'left', display: 'inline-block'}} >
        <h1 style={{display: 'inline-block', width: '1200px'}}>City Dashboard - San Francisco</h1>
        <WidgetList widgets={this.props.widgets}/>
      </div>
    );
  }
}
