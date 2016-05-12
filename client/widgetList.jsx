import React, { PropTypes } from 'react';
import _ from 'underscore';
import WidgetListItem from './widgetListItem'

export default class WidgetList extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    let widgetListItems = [];
    if(this.props.widgets && Object.keys(this.props.widgets).length > 0) {
      _.each(this.props.widgets, (widget) => widgetListItems.push(<WidgetListItem id={ widget.id } name={ widget.name } deployed={ widget.deployed } handleClick={ this.props.handleClick } /> ));
    } else {
      widgetListItems.push(<WidgetListItem id='' name='No Widgets Loaded' deployed='true' />);
    }
    return (
      <div style={{paddingLeft: '5px'}} className="nav-item active pull-xs-right dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="widgetList" data-toggle="dropdown">
            Widgets
          </button>
          <div className="dropdown-menu dropdown-menu-right">
            {widgetListItems}
          </div>
      </div>
    );
  }
}
