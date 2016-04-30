import React, { PropTypes } from 'react';
import classNames from 'classnames';

export default class WidgetListItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let itemClasses = classNames("dropdown-item", {
      'disabled': this.props.deployed
    });
    var trigger = function() {
      this.props.handleClick(this.props.id);
    };
    trigger = trigger.bind(this);
    return (
      <button onClick={ trigger } className={itemClasses} href="#">{ this.props.name }</button>
    );
  }
}
