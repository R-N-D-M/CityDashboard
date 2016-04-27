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
  init() {
    let info = geomagnetism.model().point([37.787507, -122.399838]);
    console.log("Magnetic declination: ", info.decl, '----');
    let magneticDeclination = info.decl;
    // let magneticDeclination = info.decl;
    let compass = document.getElementById('compass');
    if (window.DeviceOrientationEvent) {

      window.addEventListener('deviceorientation', function(event) {
        var alpha, webkitAlpha;
        //Check for iOS property
        if (event.webkitCompassHeading) {
          alpha = event.webkitCompassHeading;
          //Rotation is reversed for iOS
          compass.style.WebkitTransform = 'rotate(-' + alpha + 'deg)';
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

        // compass.style.Transform = 'rotate(' + alpha + 'deg)';
        compass.style.Transform = 'rotate(-' + ((magneticDeclination + (360-alpha))%360) + 'deg)';
        // compass.style.WebkitTransform = 'rotate('+ webkitAlpha + 'deg)';
        compass.style.WebkitTransform = 'rotate(-'+ ((magneticDeclination + (360-webkitAlpha))%360) + 'deg)';
        //Rotation is reversed for FireFox
        // compass.style.MozTransform = 'rotate(' + alpha + 'deg)';
        compass.style.MozTransform = 'rotate(' + ((magneticDeclination + (360-alpha))%360) + 'deg)';

        console.log("Heading: ", (360-alpha));
        document.getElementById('heading').innerHTML = "360-alpha: " + ((360 - alpha)%360);
        document.getElementById('heading2').innerHTML = "magneticDeclination+360-alpha: " + ((magneticDeclination+360 - alpha)%360);
        // document.getElementById('heading3').innerHTML = "calculatedBearing: " + (calculatedBearing);
        document.getElementById('heading4').innerHTML = "Magnetic Declination: " + (magneticDeclination);
      }, false);
    }
  }
  render() {
    let compassStyle = {
      // border: '1px solid black',
      // width: '50%',
      // margin: '0 0 0 2.5%'
      transformOrigin: '50% 50%',
      WebkitTransformOrigin: '50% 50%',
      MozTransformOrigin: '50% 50%',
    };

    return (
      <div>
        <img id={'compass'} style={compassStyle} src={'compass5.png'} />
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
