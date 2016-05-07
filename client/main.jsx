import React from 'react';
import ReactGridLayout from 'react-grid-layout';
import _ from 'underscore';
import {ref} from './helpers/constants';
import NavBar from './navBar';
import Weather from './widgets/weather';
import Bart from './widgets/bart';
import Nearby from './widgets/nearby';
import Movies from './widgets/movies';
import Notepad from './widgets/notepad';

import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
let WidthProvider = ReactGridLayout.WidthProvider;
let ResponsiveReactGridLayout = ReactGridLayout.Responsive;
ResponsiveReactGridLayout = WidthProvider(ResponsiveReactGridLayout);

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationTrue: false,
      idToken: false
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
      },
      notepad: {
        id: 'notepad',
        name: 'Notepad',
        makeFunction: this.makeNotepad
      }
    };
    // deployed widgets are pushed in this array for rendering
    this.state.deployedWidgets = [];

    this.makeBart = this.makeBart.bind(this);
    this.makeNearby = this.makeNearby.bind(this);
    this.makeWeather = this.makeWeather.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.makeNotepad = this.makeNotepad.bind(this);

    this.handleLayoutChange = this.handleLayoutChange.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.save = this.save.bind(this);
    // saving state layout
    this.defaultLayout = [
      {i: 'a', x: 0, y: 0, w: 2, h: 2, static: true},
      // {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 4, maxW: 8},
      {i: 'b', x: 0, y: 0, w: 3, h: 3},
      {i: 'c', x: 0, y: 0, w: 3, h: 3},
      {i: 'd', x: 0, y: 0, w: 3, h: 3},
      {i: 'e', x: 0, y: 0, w: 3, h: 3},
      {i: 'f', x: 0, y: 0, w: 3, h: 3}
    ];

    this.layout = this.layout || this.defaultLayout;

    // this.state.layout = this.state.layout || this.state.defaultLayout;

    this.state.notepad = {
      notes: [
        // {
        //   id: 1,
        //   content: "Hello, world!\nBoring.\nBoring.\nBoring."
        // },
        // {
        //   id: 2,
        //   content: "React is awesome.\nSeriously, it's the greatest."
        // },
        // {
        //   id: 3,
        //   content: "Robots are pretty cool.\nRobots are awesome, until they take over."
        // },
        // {
        //   id: 4,
        //   content: "Monkeys.\nWho doesn't love monkeys?"
        // }
      ]
    };
    
    // default notepad settings
    this.state.notepad.selectedId = null;
    this.state.notepad.nextNodeId = this.state.notepad.nextNodeId || 1;

    this.handleNPstate = this.handleNPstate.bind(this);
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
  handleLayoutChange(layout) {
    //this.setState({layout:layout});
    console.log("this", this);
    console.log("layout change fired, this.state.layout", this.state, "argument layout: ", layout);
  }
  updateStateOnFirebase(someStateObject) {
    if(someStateObject.name="Bart") {
      // do the firebase thing that'll update teh bart state on firebase
    }
  }
  makeBart(context) {
    return <div className="drag" key={'b'} style={{border: "1px solid red", overflow: "hidden"}}>
      <div className="drag" style={{width:"100%", backgroundColor: "#F08080"}}>DRAG ME</div>
      <Bart location={context.state.locationTrue} />
    </div>
  }
  makeWeather(context) {
    // return <Weather location={ context.state.locationTrue } />;
    return <div className="drag" key={'c'} style={{border: "1px solid blue", overflow: "hidden"}}>
      <div className="drag" style={{width:"100%", backgroundColor: "#ADD8E6"}}>DRAG ME</div>
      <Weather location={context.state.locationTrue} />
    </div>
  }
  makeNearby(context) {
    // return <Nearby location={ context.state.locationTrue } />
    return <div className="drag" key={'d'} style={{border: "1px solid pink", overflow: "hidden"}}>
      <div className="drag" style={{width:"100%", backgroundColor: "#FFB6C1"}}>DRAG ME</div>
      <Nearby location={context.state.locationTrue} />
    </div>
  }
  makeMovies(context) {
    // return <Movies location={ context.state.locationTrue } />
    return <div className="drag" key={'e'} style={{border: "1px solid orange", overflow: "hidden"}}>
      <div className="drag" style={{width:"100%", backgroundColor: "#FFA07A"}}>DRAG ME</div>
      <Movies location={context.state.locationTrue} />
    </div>
  }
  onLogin(userID, profile) {
    ref.child(`users/${userID}`).set(profile);
  }
  onLogout() {
    localStorage.removeItem('userToken');
    window.location.href= "/";
  }
  save() {
    ref.set({state: this.state}, (error) => {
      if (error) {
        console.log('Synchronization failed');
      }
      else {
        console.log('Synchronization succeeded');
      }
    });
  }
  makeNotepad(context) {
    // return <Movies location={ context.state.locationTrue } />
    return <div className="drag" key={'f'} style={{border: "1px solid green", overflow: "auto"}}>
      <div className="drag" style={{width:"100%", backgroundColor: "#90EE90"}}>DRAG ME</div>
      <Notepad notepad={context.state.notepad} handleNPchange={context.handleNPstate}/>
    </div>
  }
  handleNPstate(statefromNP) {
    this.setState({
      notepad: statefromNP
    });
    // console.log("NOTEPAD STATE-handleNPstate: ", this.state.notepad);
  }
  render() {
    // will move to state later
    // console.log("NOTEPAD STATE-RENDER: ", this.state.notepad);
    let widgets = [];
    _.each(this.state.deployedWidgets, (widget) => {
      widgets.push(widget.makeFunction(this));
    });

    if (widgets.length < 1) {
      widgets = <div key={'a'} style={{border: "1px solid red", display: "none"}}>a</div>;
    }
    return (
      <div className="container-fluid">
        <NavBar lock={this.lock} idToken={this.state.idToken} style={{paddingLeft: '0px', marginLeft: '0px'}} onLogin={this.onLogin} onLogout={this.onLogout} widgets={this.state.widgets} handleClick={ this.handleClick } />
        {/*<div>
          <button onClick={this.saveState}>Save</button>
        </div>*/}
        <div className="container-fluid">
          <ResponsiveReactGridLayout className="layout" layout={this.state.layout} onLayoutChange={this.handleLayoutChange} rowHeight={300} width={1500} breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
      cols={{lg: 6, md: 6, sm: 6, xs: 3, xxs: 2}} style={{border: "1px solid black"}} draggableHandle={'.drag'}>
            {widgets}
          </ResponsiveReactGridLayout>
        </div>
      </div>
    );
  }
}
