import {expect} from 'chai';
var bars = require('../server/bars');

describe('getBarsList', function () {
  it('should return a list of bars', function () {
    bars.getBarsList({
      body: {
        location: '-33.8670,151.1957',
        radius: 500
      }
    })
      .then((response) => {
        console.log("Test response success",response);
      })
      .catch((response) => {
        console.log("Test response failure",response);
      })
  });
});
