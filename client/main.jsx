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
      idToken: false,
      deployedWidgets: [],
      profile: null
    };
    this.widgets = {
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

    this.makeBart = this.makeBart.bind(this);
    this.makeNearby = this.makeNearby.bind(this);
    this.makeWeather = this.makeWeather.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.makeNotepad = this.makeNotepad.bind(this);

    this.handleLayoutChange = this.handleLayoutChange.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.save = this.save.bind(this);
    this.getLayoutsAndState = this.getLayoutsAndState.bind(this);
    this.logLayouts = this.logLayouts.bind(this);
    this.getLayouts = this.getLayouts.bind(this);

    // saving state layout
    this.defaultLayouts = {
      lg: [{i: 'a', x: 0, y: 0, w: 2, h: 2, static: true},
        // {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 4, maxW: 8},
        {i: 'b', x: 0, y: 0, w: 3, h: 3},
        {i: 'c', x: 0, y: 0, w: 3, h: 3},
        {i: 'd', x: 0, y: 0, w: 3, h: 3},
        {i: 'e', x: 0, y: 0, w: 3, h: 3},
        {i: 'f', x: 0, y: 0, w: 3, h: 3}
      ],
      md: [{i: 'a', x: 0, y: 0, w: 2, h: 2, static: true},
        // {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 4, maxW: 8},
        {i: 'b', x: 0, y: 0, w: 3, h: 3},
        {i: 'c', x: 0, y: 0, w: 3, h: 3},
        {i: 'd', x: 0, y: 0, w: 3, h: 3},
        {i: 'e', x: 0, y: 0, w: 3, h: 3},
        {i: 'f', x: 0, y: 0, w: 3, h: 3}
      ],
      sm: [{i: 'a', x: 0, y: 0, w: 2, h: 2, static: true},
        // {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 4, maxW: 8},
        {i: 'b', x: 0, y: 0, w: 3, h: 3},
        {i: 'c', x: 0, y: 0, w: 3, h: 3},
        {i: 'd', x: 0, y: 0, w: 3, h: 3},
        {i: 'e', x: 0, y: 0, w: 3, h: 3},
        {i: 'f', x: 0, y: 0, w: 3, h: 3}
      ],
      xs: [{i: 'a', x: 0, y: 0, w: 2, h: 2, static: true},
        // {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 4, maxW: 8},
        {i: 'b', x: 0, y: 0, w: 3, h: 3},
        {i: 'c', x: 0, y: 0, w: 3, h: 3},
        {i: 'd', x: 0, y: 0, w: 3, h: 3},
        {i: 'e', x: 0, y: 0, w: 3, h: 3},
        {i: 'f', x: 0, y: 0, w: 3, h: 3}
      ],
      xxs: [{i: 'a', x: 0, y: 0, w: 2, h: 2, static: true},
        // {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 4, maxW: 8},
        {i: 'b', x: 0, y: 0, w: 3, h: 3},
        {i: 'c', x: 0, y: 0, w: 3, h: 3},
        {i: 'd', x: 0, y: 0, w: 3, h: 3},
        {i: 'e', x: 0, y: 0, w: 3, h: 3},
        {i: 'f', x: 0, y: 0, w: 3, h: 3}
      ]
    };
    this.getLayouts();
    // default notepad if no previous notepad is found
    this.defaultNotepad = {
      notes: []
    };

    // set notepad here
    this.state.notepad = this.state.notepad || this.defaultNotepad;

    // default notepad settings
    this.state.notepad.selectedId = null;
    this.state.notepad.nextNodeId = this.state.notepad.nextNodeId || 1;

    // handleNPstate transfers the state of the child Notepad to main component
    this.handleNPstate = this.handleNPstate.bind(this);
  }
  componentWillMount() {
    this.lock = new Auth0Lock('NF8TGDHHhTxVpTYSzVvzJyaEeKzDkSZj', 'citydash.auth0.com');
    this.setState({idToken: this.getIdToken()});
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
  getLayouts() {
    let layouts = localStorage.getItem('layouts');
    if(layouts) {
      layouts = JSON.parse(layouts);
      return layouts;
    }
    return this.defaultLayouts;
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
      this.setState({deployedWidgets: this.state.deployedWidgets.concat(this.widgets[input])});
    }
  }
  handleLayoutChange(currentLayout, allLayouts) {
    if(currentLayout && allLayouts){
      console.log('currentLayout and allLayouts', currentLayout, allLayouts);
      localStorage.setItem('layouts', JSON.stringify(allLayouts));
    }
    console.log("handleLayoutChange", localStorage.getItem('layouts'));
  }
  makeBart(context) {
    return <div className="drag" key={'b'} style={{border: "1px solid red", overflow: "hidden"}}>
      <div className="drag" style={{width:"100%", backgroundColor: "#F08080"}}>DRAG ME</div>
      <Bart location={context.state.locationTrue} />
    </div>
  }
  makeWeather(context) {
    return <div className="drag" key={'c'} style={{border: "1px solid blue", overflow: "hidden"}}>
      <div className="drag" style={{width:"100%", backgroundColor: "#ADD8E6"}}>DRAG ME</div>
      <Weather location={context.state.locationTrue} />
    </div>
  }
  makeNearby(context) {
    return <div className="drag" key={'d'} style={{border: "1px solid pink", overflow: "hidden"}}>
      <div className="drag" style={{width:"100%", backgroundColor: "#FFB6C1"}}>DRAG ME</div>
      <Nearby location={context.state.locationTrue} />
    </div>
  }
  makeMovies(context) {
    return <div className="drag" key={'e'} style={{border: "1px solid orange", overflow: "hidden"}}>
      <div className="drag" style={{width:"100%", backgroundColor: "#FFA07A"}}>DRAG ME</div>
      <Movies location={context.state.locationTrue} />
    </div>
  }
  onLogin(userID, profile) {
    ref.child(`users/${userID}`).update(profile);
    this.setState({profile: profile});
    this.getLayoutsAndState();
  }
  getLayoutsAndState(){
    ref.child(`users/${this.state.profile.user_id}`).on('value', (snapshot) => {
      if(!snapshot.val().layoutsAndState){
        this.save();
      }
      else {
        let layoutsAndState = JSON.parse(snapshot.val().layoutsAndState);
        localStorage.setItem('layouts', JSON.stringify(layoutsAndState.layouts));
        this.setState(layoutsAndState.state);
        console.log('set the layout and state, layout: ', layoutsAndState.layouts, 'this.state: ', this.state);
      }
      // console.log("snapshot.val()", snapshot.val());
      // console.log("layoutAndState", );
    });
  }
  onLogout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('layouts');
    this.setState({profile: null});
    window.location.href= "/";
  }
  save() {
    let layouts = this.getLayouts();
    let layoutsAndState = {
      layouts: layouts,
      state: this.state
    };
    console.log("saving layouts and state: ", layoutsAndState);
    layoutsAndState = JSON.stringify(layoutsAndState);
    ref.child(`users/${this.state.profile.user_id}`).update({layoutsAndState: layoutsAndState}, (error) => {
      if (error) {
        console.log('Synchronization failed');
      }
      else {
        console.log('Synchronization succeeded');
      }
    });
  }
  makeNotepad(context) {
    return <div className="drag" key={'f'} style={{border: "1px solid green", overflow: "auto"}}>
      <div className="drag" style={{width:"100%", backgroundColor: "#90EE90"}}>DRAG ME</div>
      <Notepad notepad={context.state.notepad} handleNPchange={context.handleNPstate}/>
    </div>
  }
  handleNPstate(statefromNP) {
    this.setState({notepad: statefromNP});
  }
  logLayouts() {
    console.log("this.layout", this.getLayouts());
    this.forceUpdate();
  }
  render() {
    // will move to state later
    // console.log("NOTEPAD STATE-RENDER: ", this.state.notepad);
    let widgets = [];
    _.each(this.state.deployedWidgets, (widget) => {
      if(!widget.makeFunction) {
        widget.makeFunction = this.widgets[widget.id].makeFunction;
      }
      widgets.push(widget.makeFunction(this));
    });

    if (widgets.length < 1) {
      widgets = <div key={'a'} style={{border: "1px solid red", display: "none"}}>a</div>;
    }
    let layouts = this.getLayouts();
    return (
      <div className="container-fluid">
        <NavBar profile={this.state.profile} lock={this.lock} idToken={this.state.idToken} style={{paddingLeft: '0px', marginLeft: '0px'}} onLogin={this.onLogin} onLogout={this.onLogout} widgets={this.widgets} handleClick={ this.handleClick } />
        <div>
          <button onClick={this.save}>Save</button>
          <button onClick={this.logLayout}>Layout</button>
        </div>
        <div className="container-fluid">
          <ResponsiveReactGridLayout className="layout" layouts={layouts} onLayoutChange={this.handleLayoutChange} rowHeight={300} width={1500} breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 200}}
      cols={{lg: 6, md: 6, sm: 6, xs: 3, xxs: 2}} style={{border: "1px solid black"}} draggableHandle={'.drag'}>
            {widgets}
          </ResponsiveReactGridLayout>
        </div>
      </div>
    );
  }
}
