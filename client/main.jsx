import React from 'react';
import ReactGridLayout from 'react-grid-layout';
import _ from 'underscore';
import NavBar from './navBar';
import Weather from './weather';
import Bart from './bart';
import Nearby from './nearby';
import Movies from './movies';
import Home from './home';
import LoggedIn from './loggedIn';

import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
let WidthProvider = ReactGridLayout.WidthProvider;
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
    // deployed widgets are pushed in this array for rendering
    this.state.deployedWidgets = [];

    this.makeBart = this.makeBart.bind(this);
    this.makeNearby = this.makeNearby.bind(this);
    this.makeWeather = this.makeWeather.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  componentWillMount() {
    this.lock = new Auth0Lock('NF8TGDHHhTxVpTYSzVvzJyaEeKzDkSZj', 'citydash.auth0.com');

    this.setState({idToken: this.getIdToken()});
  }
  getIdToken() {
    let idToken = localStorage.getItem('userToken');
    let authHash = this.lock.parseHash(window.location.hash);
    if (!idToken && authHash) {
      if (authHash.id_token) {
        idToken = authHash.id_token
        localStorage.setItem('userToken', authHash.id_token);
      }
      if (authHash.error) {
        console.log("Error signing in", authHash);
        return null;
      }
    }
    return idToken;
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
      // console.log("Deploying", this.state.widgets[input].name);
      this.setState({deployedWidgets: this.state.deployedWidgets.concat(this.state.widgets[input])});
    }
  }
  makeBart(context) {
    return <div key={'b'} style={{border: "1px solid red", overflow: "scroll"}}>
      <Bart location={context.state.locationTrue} />
    </div>
  }
  makeWeather(context) {
    // return <Weather location={ context.state.locationTrue } />;
    return <div key={'c'} style={{border: "1px solid blue", overflow: "scroll"}}>
      <Weather location={context.state.locationTrue} />
    </div>
  }
  makeNearby(context) {
    // return <Nearby location={ context.state.locationTrue } />
    return <div key={'d'} style={{border: "1px solid pink", overflow: "scroll"}}>
      <Nearby location={context.state.locationTrue} />
    </div>
  }
  makeMovies(context) {
    // return <Movies location={ context.state.locationTrue } />
    return <div key={'e'} style={{border: "1px solid orange", overflow: "scroll"}}>
      <Movies location={context.state.locationTrue} />
    </div>
  }
  render() {
    // if (this.state.idToken) {
    //   return (<LoggedIn lock={this.lock} idToken={this.state.idToken} />);
    // } 
    // else {
    //   return (<Home lock={this.lock} />);
    // }
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
      {i: 'a', x: 0, y: 0, w: 2, h: 2, static: true},
      // {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 4, maxW: 8},
      {i: 'b', x: 0, y: 0, w: 3, h: 3},
      {i: 'c', x: 0, y: 0, w: 3, h: 3},
      {i: 'd', x: 0, y: 0, w: 3, h: 3},
      {i: 'e', x: 0, y: 0, w: 3, h: 3}
    ];
    if (widgets.length < 1) {
      widgets = <div key={'a'} style={{border: "1px solid red", display: "none"}}>a</div>;
    }
    //, minW: 2, maxW: 4
    return (
      <div style={{height: window.innerHeight*1.1}} className="container-fluid">
        <NavBar style={{paddingLeft: '0px', marginLeft: '0px'}} widgets={this.state.widgets} handleClick={ this.handleClick }/>
        <div className="container-fluid">
          <ResponsiveReactGridLayout className="layout" layout={layout} rowHeight={300} width={1500} breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
      cols={{lg: 6, md: 6, sm: 6, xs: 1, xxs: 2}} style={{border: "1px solid black"}}>
            {widgets}
          </ResponsiveReactGridLayout>
        </div>
      </div>
    );
  }
}
