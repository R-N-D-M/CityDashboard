import React from 'react';
// var geomagnetism = require('geomagnetism');
import geomagnetism from 'geomagnetism';

class Compass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.init();
  }
  bearingDegrees (lat1, long1, lat2, long2) {
    let degToRad= Math.PI/180.0;

    let phi1= lat1 * degToRad;
    let phi2= lat2 * degToRad;
    let lam1= long1 * degToRad;
    let lam2= long2 * degToRad;

    return Math.atan2(Math.sin(lam2-lam1) * Math.cos(phi2),
        Math.cos(phi1)*Math.sin(phi2) - Math.sin(phi1)*Math.cos(phi2)*Math.cos(lam2-lam1)
    ) * 180/Math.PI;
  }
  init() {
    // locations
    let currentLocation = [37.787507, -122.399838];
    let unoDosTacosLocation = [37.789341, -122.400751];

    // get magnetic declination
    let info = geomagnetism.model().point(currentLocation);
    console.log("Magnetic declination: ", info.decl, '----');
    let magneticDeclination = info.decl;

    // get heading of bar (right now Uno Dos Tacos (4/27/2015))
    let calculatedBearing = this.bearingDegrees(currentLocation[0], currentLocation[1],unoDosTacosLocation[0],unoDosTacosLocation[1]);

    let compass = document.getElementById('compass');
    if (window.DeviceOrientationEvent) {

      window.addEventListener('deviceorientation', function(event) {
        var alpha, webkitAlpha;
        //Check for iOS property
        if (event.webkitCompassHeading) {
          alpha = event.webkitCompassHeading;
          //Rotation is reversed for iOS
          // compass.style.WebkitTransform = 'rotate(' + ((calculatedBearing - (magneticDeclination + (360-alpha)))%360) + 'deg)';
        }
        //non iOS
        else {
          alpha = event.alpha;
          webkitAlpha = alpha;
          if (!window.chrome) {
            //Assume Android stock (this is crude, but good enough for our example) and apply offset
            webkitAlpha = alpha - 270;
          }
        }
        // Get compass heading by 360 - alpha

        let md1 = -1*(calculatedBearing - (magneticDeclination + (360-alpha))) % 360;
        let md2 = -1*(calculatedBearing - (magneticDeclination + (360-webkitAlpha))) % 360;
        let md3 = (calculatedBearing - (magneticDeclination + (360-alpha))) % 360;

        compass.style.Transform = 'rotate(' + md1 + 'deg)';
        // chrome uses this
        compass.style.WebkitTransform = 'rotate('+ md2 + 'deg)';
        //Rotation is reversed for FireFox
        compass.style.MozTransform = 'rotate(' + md3 + 'deg)';

        console.log("Direction: ", (360-webkitAlpha));
        document.getElementById('heading').innerHTML = "360-webkitAlpha: " + ((360 - webkitAlpha)%360);
        document.getElementById('heading2').innerHTML = "magneticDeclination+360-alpha: " + ((magneticDeclination+360 - alpha)%360);
        document.getElementById('heading3').innerHTML = "Magnetic Declination: " + (magneticDeclination);
        document.getElementById('heading4').innerHTML = "calculatedBearing: " + (calculatedBearing);

      }, false);
    }
  }
  render() {
    let compassStyle = {
      // border: '1px solid black',
      // width: '50%',
      // margin: '0 0 0 2.5%'
      // border: '1px solid blue',
      width: '60%',
      transformOrigin: '50% 50%',
      WebkitTransformOrigin: '50% 50%',
      MozTransformOrigin: '50% 50%',
    };

    return (
      <div>
        <div style={{width: '100%', textAlign: 'center'}}>
          <img id={'compass'} style={compassStyle} src={'compass_red.png'} />
        </div>
        <div id={'heading'}></div>
        <div id={'heading2'}></div>
        <div id={'heading3'}></div>
        <div id={'heading4'}></div>
      </div>
    );
  }

}

export default Compass;







// const geomagnetism = require('geomagnetism');

// // information for "right now"
// const info = geomagnetism.model().point([37.7873116, -122.3996049]);
// console.log('declination:', info.decl);
