import React from 'react';
import ReactGridLayout from 'react-grid-layout';

import Weather from './weather';
class Gridtest extends React.Component {

  render() {
    // layout is an array of objects, see the demo for more complete usage
    let layout = [
      {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
      {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
      {i: 'c', x: 4, y: 0, w: 1, h: 2}
    ];

    return (
      <div>
        <ReactGridLayout className="layout" layout={layout} cols={12} rowHeight={1200} width={1200} style={{border: "1px solid black"}}>
          <Weather key={'a'} style={{border: "1px solid red"}}>a</Weather>
        </ReactGridLayout>
      </div>
    );
  }

}

export default Gridtest;


return (
  <div style={{height: window.innerHeight*1.1}} className="container-fluid">
    <NavBar style={{paddingLeft: '0px', marginLeft: '0px'}} widgets={this.state.widgets} handleClick={ this.handleClick }/>
    <div className="container-fluid" style={{backgroundColor: 'red'}}>
      {widgets}
    </div>
    // <div>
    //   <ReactGridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200} style={{border: "1px solid black"}}>
    //     <div key={'c'} style={{border: "1px solid red", width: "350px", height: "350px"}}>
    //       <Weather location={ this.state.locationTrue }/>
    //     </div>
    //     <div key={'b'} style={{border: "1px solid red", width: "350px", height: "350px"}}>
    //       <Nearby location={ this.state.locationTrue }/>
    //     </div>
    //   </ReactGridLayout>
    // </div>
  </div>

);
