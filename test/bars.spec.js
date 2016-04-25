import {expect} from 'chai';
import bars from '../server/bars';

describe('getBarsList', function () {
  it('should return a list of bars', function () {
    bars.getBarsList({
      body: {
        location: -33.8670,151.1957,
        radius: 500
      }
    });
  });
});
