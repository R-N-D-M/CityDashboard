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

    return (
      <a className={itemClasses} href="#">{ this.props.name }</a>
    );
  }
}

WidgetListItem.propTypes = {

};
