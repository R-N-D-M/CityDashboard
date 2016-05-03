import React from 'react';
import ReactGridLayout from 'react-grid-layout';
import _ from 'lodash';
import NavBar from './navBar';
import Weather from './weather';
import Bart from './bart';
import Nearby from './nearby';
import Movies from './movies';

import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
// import WidthProvider from 'react-grid-layout'.WidthProvider;
let WidthProvider = ReactGridLayout.WidthProvider;
// import ResponsiveReactGridLayout from 'react-grid-layout'.Responsive;
let ResponsiveReactGridLayout = ReactGridLayout.Responsive;
ResponsiveReactGridLayout = WidthProvider(ResponsiveReactGridLayout);

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationTrue: false
    };
    this.state.widgets = {
      weather: {
        id: 'weather',
        name: 'Weather',
        makeFunction: this.makeWeather
      },
      bart: {
        id: 'bart',
        name: 'Bart',
        makeFunction: this.makeBart
      },
      nearby: {
        id: 'nearby',
        name: 'Nearby',
        makeFunction: this.makeNearby
      },
      movies: {
        id: 'movies',
        name: 'Movies',
        makeFunction: this.makeMovies
      }
    };
    this.state.deployedWidgets = [
      this.state.widgets.weather
    ];
    this.makeBart = this.makeBart.bind(this);
    this.makeNearby = this.makeNearby.bind(this);
    this.makeWeather = this.makeWeather.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( (position) => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        this.setState({
          locationTrue: [lat, lng]
        });
      });
    }
  }
  handleClick(input) {
    let deployed = false;
    for(let i = 0; i < this.state.deployedWidgets.length; i++){
      if(this.state.deployedWidgets[i].id === input) {
        deployed = true;
      }
    };
    if(deployed) {
      this.setState({deployedWidgets: _.reject(this.state.deployedWidgets, (widget) => {
        return widget.id === input;
      })});
    }
    else {
      console.log("Deploying", this.state.widgets[input].name);
      this.setState({deployedWidgets: this.state.deployedWidgets.concat(this.state.widgets[input])});
    }
  }
  makeBart(context) {
    return <Bart location={ context.state.locationTrue }/>;
  }
  makeWeather(context) {
    return <Weather location={ context.state.locationTrue } />;
  }
  makeNearby(context) {
    return <Nearby location={ context.state.locationTrue } />
  }
  makeMovies(context) {
    return <Movies location={ context.state.locationTrue } />
  }
  render() {
    let widgets = [];
    _.each(this.state.deployedWidgets, (widget) => {
      widgets.push(widget.makeFunction(this));
    });

    // var layouts = {0: [
    //   {i: 'a', x: 0, y: 0, w: 1, h: 2, static: false},
    //   {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
    //   {i: 'c', x: 4, y: 0, w: 1, h: 2}
    // ]};

    let layout = [
      {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
      {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 4, maxW: 8},
      {i: 'c', x: 4, y: 0, w: 1, h: 2}
    ];
    //, minW: 2, maxW: 4
    return (
      <div style={{height: window.innerHeight*1.1}} className="container-fluid">
        <NavBar style={{paddingLeft: '0px', marginLeft: '0px'}} widgets={this.state.widgets} handleClick={ this.handleClick }/>
        <div className="container-fluid" style={{backgroundColor: 'red'}}>
          {widgets}
        </div>
        <div>
          <ResponsiveReactGridLayout className="layout" layout={layout} rowHeight={350} width={1500} breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
      cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}} style={{border: "1px solid black"}}>
          <div key={'b'} style={{border: "1px solid red", overflow: "hidden"}}>
            <Weather location={this.state.locationTrue} />
          </div>
          <div key={'c'} style={{border: "1px solid blue", overflow: "hidden"}}>
            <Nearby location={this.state.locationTrue} />
          </div>
          </ResponsiveReactGridLayout>
        </div>
      </div>

    );
  }
}

// <div key={'b'} style={{border: "1px solid red", overflow: "hidden"}}>
//   <Weather location={this.state.locationTrue} />
// </div>
// <div key={'c'} style={{border: "1px solid blue", overflow: "hidden"}}>
//   <Nearby location={this.state.locationTrue} />
// </div>
