import React, { PropTypes } from 'react';
import getBarsList from '../server/bars';

// ES6 SYNTAX TO IMPORT A NODE MODULE
// import SC from 'soundcloud';
// import _ from 'underscore';
// import SongPlayer from './songPlayer';
// import Playlist from './playlist';
// import Track from './track';
// import Queue from './queue';


// ES6 SYNTAX TO CREATE A REACT CLASS WITH STATE.
// NOTE THE 'export default' THAT SYNTAX WILL MAKE THIS THE DEFAULT EXPORT FROM THIS FILE
class Inner extends React.Component {
  //ES6 SYNTAX FOR A CLASS CONSTRUCTOR
  constructor(props) {
    super(props);
    this.state = {
      myVal: "setThis"
    }
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

  componentWillMount(){

    // let p = getBarsList(myObj);
    // console.log("p is: ", p);
    // p.then(value => {
    //   console.log('value is: ', value);
    //   this.setState({myVal: value});
    // }).catch(value => {
    //   console.log('this failed, you suck');
    // });
    // console.log("p is now: ", p);
  }

  //ES6 SYNTAX FOR DEFINING METHODS ON CLASSES
  // componentWillMount() {
  //   SC.initialize({
  //     client_id: this.props.soundCloudKey
  //   });
  //   this.search();
  // }


  render() {
      // var prom = getBarsList(myObj);
      // getBarsList.then(function(value){
      //   console.log('value is: ', value);
      // }));
    if (!this.state.myVal) return
    return (
      <div className='barList'>
        InnerTest
        <p>{this.state.myVal}
        </p>
      </div>
    );
  }
}

// ATTACH PROPTYPE VALIDATION TO ES6 CLASS(NOT ES6 SYNTAX BUT NECESSARY FOR REACT)
// Inner.propTypes = {

// };
let myObj = {
    body: {
    location: '33.8670,151.1957',
    radius: 500
  }
}
export default Inner;
