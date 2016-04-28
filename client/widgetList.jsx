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
      <div style={{display: 'inline-block', swidth: '460px'}}>
        <input type='search' placeholder='Search for Widgets'/>
        <select name='widgets' style={{display: 'inline-block'}}>
          {widgetListItems}
        </select>
      </div>
    );
  }
}
