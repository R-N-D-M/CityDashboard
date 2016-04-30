import React, { PropTypes } from 'react';
import WidgetListItem from './widgetListItem'

export default class WidgetList extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const widgetListItems = this.props.widgets.map((widget) => <WidgetListItem name={ widget.name } deployed={ widget.deployed } /> );
    console.log("widgetListItems", widgetListItems);
    return (
      <div className="nav-item active pull-xs-right dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="widgetList" data-toggle="dropdown">
            Widgets
          </button>
          <div className="dropdown-menu">
            {widgetListItems}
          </div>
      </div>
    );
  }
}
