import React, { PropTypes } from 'react';

export default class WidgetListItem extends React.Component {
  constructor(props) {
    super(props);

  }


  render() {

    return (
      <option>{this.props.name}</option>
    );
  }
}

WidgetListItem.propTypes = {

};
