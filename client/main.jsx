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
      profile: null,
      layouts: this.getLayouts()
    };
    this.widgets = {
      weather: {
        id: 'weather',
        name: 'Weather',
        makeFunction: this.makeWeather
      },
      bart: {
        id: 'bart',
        name: 'B.A.R.T.',
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

    this.autoSave = this.autoSave.bind(this);
    this.makeBart = this.makeBart.bind(this);
    this.makeNearby = this.makeNearby.bind(this);
    this.makeWeather = this.makeWeather.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.makeNotepad = this.makeNotepad.bind(this);

    this.handleLayoutChange = this.handleLayoutChange.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.save = this.save.bind(this);
    this.getLayoutsAndState = this.getLayoutsAndState.bind(this);
    this.getLayouts = this.getLayouts.bind(this);


    // // saving state layout
    // this.defaultLayouts = {
    //   lg: [{i: 'a', x: 0, y: 0, static: true, minW: 6},
    //     {i: 'b', x: 0, y: 0, w: 2, h: 1, minH: 1, minW: 1},
    //     {i: 'c', x: 0, y: 0, w: 2, h: 1, minH: 1, minW: 2},
    //     {i: 'd', x: 0, y: 0, w: 2, h: 1, minH: 1, minW: 1},
    //     {i: 'e', x: 0, y: 0, w: 2, h: 1, minH: 1, minW: 1},
    //     {i: 'f', x: 0, y: 0, w: 2, h: 1, minH: 1, minW: 1}
    //   ],
    //   md: [{i: 'a', x: 0, y: 0, w: 2, h: 2, static: true},
    //     {i: 'b', x: 0, y: 0, w: 3, h: 3},
    //     {i: 'c', x: 0, y: 0, w: 3, h: 3},
    //     {i: 'd', x: 0, y: 0, w: 3, h: 3},
    //     {i: 'e', x: 0, y: 0, w: 3, h: 3},
    //     {i: 'f', x: 0, y: 0, w: 3, h: 3}
    //   ],
    //   sm: [{i: 'a', x: 0, y: 0, w: 2, h: 2, static: true},
    //     {i: 'b', x: 0, y: 0, w: 3, h: 3},
    //     {i: 'c', x: 0, y: 0, w: 3, h: 3},
    //     {i: 'd', x: 0, y: 0, w: 3, h: 3},
    //     {i: 'e', x: 0, y: 0, w: 3, h: 3},
    //     {i: 'f', x: 0, y: 0, w: 3, h: 3}
    //   ],
    //   xs: [{i: 'a', x: 0, y: 0, w: 2, h: 2, static: true},
    //     {i: 'b', x: 0, y: 0, w: 3, h: 3},
    //     {i: 'c', x: 0, y: 0, w: 3, h: 3},
    //     {i: 'd', x: 0, y: 0, w: 3, h: 3},
    //     {i: 'e', x: 0, y: 0, w: 3, h: 3},
    //     {i: 'f', x: 0, y: 0, w: 3, h: 3}
    //   ],
    //   xxs: [{i: 'a', x: 0, y: 0, w: 2, h: 2, static: true},
    //     {i: 'b', x: 0, y: 0, w: 3, h: 3},
    //     {i: 'c', x: 0, y: 0, w: 3, h: 3},
    //     {i: 'd', x: 0, y: 0, w: 3, h: 3},
    //     {i: 'e', x: 0, y: 0, w: 3, h: 3},
    //     {i: 'f', x: 0, y: 0, w: 3, h: 3}
    //   ]
    // };
    // this.state.tempLayouts = this.defaultLayouts;

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
  autoSave() {
    setInterval(this.save, 7000);
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
    this.autoSave();
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
  getLayoutsAndState(){
    ref.child(`users/${this.state.profile.user_id}`).on('value', (snapshot) => {
      if(!snapshot.val().layoutsAndState){
        // this.save();
      }
      else {
        let layoutsAndState = JSON.parse(snapshot.val().layoutsAndState);
        localStorage.setItem('layouts', JSON.stringify(layoutsAndState.layouts));
        this.setState(layoutsAndState.state);
        // console.log('set the layout and state, layout: ', layoutsAndState.layouts, 'this.state: ', this.state);
        // console.log("before loaded, layout state", this.state.tempLayouts);
        this.setState({loadedLayouts: layoutsAndState.layouts}, () => {
          // console.log("this state loaded layouts ", this.state.loadedLayouts);
          this.setState({tempLayouts:this.state.loadedLayouts});
        });
      }
    });
  }
  handleClick(widgetID) {
    let deployed = false;
    // search for widget in main.state.deployed widgets
    for(let i = 0; i < this.state.deployedWidgets.length; i++){
      // if you find it, set deployed to true
      if(this.state.deployedWidgets[i].id === widgetID) {
        deployed = true;
      }
    };
    // if deployed, remove from main.state.deployedWidgets
    if(deployed) {
      this.handleClose(widgetID);
    }
    // if not deployed, add to main.state.deployedWidgets
    else {
      this.setState({deployedWidgets: this.state.deployedWidgets.concat(this.widgets[widgetID])});
    }
  }
  handleClose(widgetID) {
    this.setState({deployedWidgets: _.reject(this.state.deployedWidgets, (widget) => {
      return widget.id === widgetID;
    })});
  }
  handleLayoutChange(currentLayout, allLayouts) {
    if(currentLayout && allLayouts){
      // console.log('HANDLE LAYOUT CHANGE: currentLayout and allLayouts', currentLayout, allLayouts);
      localStorage.setItem('layouts', JSON.stringify(allLayouts));
      this.setState({layouts: allLayouts});
    }
  }
  handleNPstate(statefromNP) {
    this.setState({notepad: statefromNP});
  }
  makeBart(context) {
    return <div className="drag widget card" key={'b'} style={{overflow: "hidden"}} _grid={{x: 0, y: 0, w: 2, h:2}}>
      <div className="drag widget widgetHeader card-header" >BART</div>
    <Bart deployed={context.state.deployedWidgets} location={context.state.locationTrue} handleClose={context.handleClose} />
    </div>
  }
  makeMovies(context) {
    return <div className="drag widget card" key={'e'} style={{overflow: "hidden", borderColor: '#373a3c'}}  _grid={{x: 0, y: 0, w:3, h: 1, minW: 3, minH: 1}}>
      <div className="drag widget widgetHeader card-header" style={{width:"100%", backgroundColor: "#909090"}}>Movies</div>
      <Movies location={context.state.locationTrue} style={{height: '100%',width: '100%'}} />
      </div>
  }
  makeNearby(context) {
    return <div id={'nearbycontainer'} className="drag widget card" key={'d'} style={{overflow: "hidden", borderColor: '#373a3c'}} _grid={{x: 0, y: 0, w: 2, h:1}}>
      <div className="drag widgetHeader card-header" style={{width:"100%"}}>Nearby</div>
      <Nearby location={context.state.locationTrue} />
    </div>
  }
  makeNotepad(context) {
    return <div className="drag widget card" key={'f'} _grid={{x: 0, y: 0, w: 2, h:3, minW: 2, minH: 2}} style={{overflow: "hidden", backgroundImage: 'url("http://paper-backgrounds.com/textureimages/2012/07/old-gray-concrete-wall-texture-hd-575x400.jpg")'}}>
      <div className="drag widgetHeader card-header" style={{width:"100%"}}>Notepad</div>
      <Notepad notepad={context.state.notepad} handleNPchange={context.handleNPstate}/>
    </div>
  }
  makeWeather(context) {
    return <div className='weatherWidget' className="drag widget card" key={'c'} style={{border: "1px solid", borderColor: '#373a3c', overflow: "hidden"}}  _grid={{x: 0, y: 0, w:2, h: 1, minW: 2, minH: 1}}>
      <div className="drag widgetHeader card-header" style={{width:"100%"}}>Weather</div>
      <Weather location={context.state.locationTrue} style={{width: '100%', height: '100%'}} />
    </div>
  }
  onLogin(userID, profile) {
    ref.child(`users/${userID}`).update(profile);
    this.setState({profile: profile});
    this.getLayoutsAndState();
  }
  onLogout() {
    // Clear local storage and refresh page
    localStorage.removeItem('userToken');
    localStorage.removeItem('layouts');
    this.setState({profile: null});
    window.location.href= "/";
  }
  save() {
    if(this.state.profile) {
      let layouts = this.getLayouts();
      let layoutsAndState = {
        layouts: layouts,
        state: this.state
      };
      layoutsAndState = JSON.stringify(layoutsAndState);
      ref.child(`users/${this.state.profile.user_id}`).update({layoutsAndState: layoutsAndState}, (error) => {
        if (error) {
          console.log('Save failed');
        }
        else {
          console.log('Save succeeded');
        }
      });
    }
  }
  render() {
    let widgets = [];
    _.each(this.state.deployedWidgets, (widget) => {
      if(!widget.makeFunction) {
        widget.makeFunction = this.widgets[widget.id].makeFunction;
      }
      widgets.push(widget.makeFunction(this));
    });
    let mainContainer;
    let layouts = this.getLayouts();
    if (widgets.length < 1) {
      mainContainer = (
        <div key={'a'} className="welcomeMessage jumbotron" style={{textAlign: 'center'}}>
          <h1 style={{opacity: '0.9'}} className="display-1">CityDashboard</h1>
          <hr className="m-y-2"></hr>
          <h1 style={{fontSize: '30px'}} className="display-4">What's Happening in Your City?</h1>
        </div>
      );
    }
    else {
      mainContainer = (
        <ResponsiveReactGridLayout className="layout" layouts={this.state.tempLayouts || this.defaultLayouts} onLayoutChange={this.handleLayoutChange} rowHeight={350} width={1500} breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 200}}
            cols={{lg: 6, md: 6, sm: 6, xs: 6, xxs: 6}} draggableHandle={'.drag'}>
            {widgets}
        </ResponsiveReactGridLayout>
      );
    }
    return (
      <div className="container-fluid">
        <NavBar profile={this.state.profile} lock={this.lock} idToken={this.state.idToken} style={{paddingLeft: '0px', marginLeft: '0px'}} onLogin={this.onLogin} onLogout={this.onLogout} widgets={this.widgets} handleClick={ this.handleClick } />
        <div className="container-fluid">
          {mainContainer}
        </div>
      </div>
    );
  }
}
