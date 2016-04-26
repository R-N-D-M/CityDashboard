const geomagnetism = require('geomagnetism');

// information for "right now"
const info = geomagnetism.model().point([37.7873116, -122.3996049]);
console.log('declination:', info.decl);
