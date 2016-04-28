import React, { PropTypes } from 'react';

import WidgetList from './widgetList';

// ES6 SYNTAX TO CREATE A REACT CLASS WITH STATE.
// NOTE THE 'export default' THAT SYNTAX WILL MAKE THIS THE DEFAULT EXPORT FROM THIS FILE
export default class NavBar extends React.Component {
  //ES6 SYNTAX FOR A CLASS CONSTRUCTOR
  constructor(props) {
    super(props);
    // this.state = { filteredTracks: [], playQueue: [] };
    // this.search = _.debounce(this.search, 200)
    //
    // // BINDING METHODS FROM THE ES6 CLASS TO THE CORRECT 'THIS' CONTEXT WHEN
    // // THE METHOD IS USED IN THE RENDER METHOD
    // this.handleFilter = this.handleFilter.bind(this);
  }

  //ES6 SYNTAX FOR DEFINING METHODS ON CLASSES
  // componentWillMount() {
  //   SC.initialize({
  //     client_id: this.props.soundCloudKey
  //   });
  //   this.search();
  // }

  render() {

    return (
      <div style={{textAlign: 'left', display: 'inline-block'}} >
        <h1 style={{display: 'inline-block', width: '1200px'}}>City Dashboard - San Francisco</h1>
        <WidgetList />
      </div>
    );
  }
}

// ATTACH PROPTYPE VALIDATION TO ES6 CLASS(NOT ES6 SYNTAX BUT NECESSARY FOR REACT)
// NavBar.propTypes = {
//
// };
