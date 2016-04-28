import React, { PropTypes } from 'react';

// ES6 SYNTAX TO IMPORT A NODE MODULE
// import SC from 'soundcloud';
// import _ from 'underscore';
// import SongPlayer from './songPlayer';
// import Playlist from './playlist';
// import Track from './track';
// import Queue from './queue';


// ES6 SYNTAX TO CREATE A REACT CLASS WITH STATE.
// NOTE THE 'export default' THAT SYNTAX WILL MAKE THIS THE DEFAULT EXPORT FROM THIS FILE
export default class Inner extends React.Component {
  //ES6 SYNTAX FOR A CLASS CONSTRUCTOR
  constructor(props) {
    super(props);
    // this.state = { filteredTracks: [], playQueue: [] };
    // this.search = _.debounce(this.search, 200)
    //
    // // BINDING METHODS FROM THE ES6 CLASS TO THE CORRECT 'THIS' CONTEXT WHEN
    // // THE METHOD IS USED IN THE RENDER METHOD
    // this.handleFilter = this.handleFilter.bind(this);
    // this.handleAddTrack = this.handleAddTrack.bind(this);
    // this.songSkipped = this.songSkipped.bind(this);
    // this.songRewind = this.songRewind.bind(this);
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
      <div>
        InnerTest
      </div>
    );
  }
}

// ATTACH PROPTYPE VALIDATION TO ES6 CLASS(NOT ES6 SYNTAX BUT NECESSARY FOR REACT)
Inner.propTypes = {

};
