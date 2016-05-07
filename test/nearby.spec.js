import React from 'react';
import {mount, shallow} from 'enzyme';
import {expect} from 'chai';
import Sinon from 'sinon';
import Axios from 'axios';

import Nearby from '../client/widgets/nearby';

  describe('<Nearby/>', () => {
    it('should have a nested div in the component to display map', function() {
      const wrapper = shallow(<Nearby />);
      expect(wrapper.find('div')).to.have.length(1);
    });

    it('should have a paragraph element to display loading when current location is temporarily unavailable', () => {
      const wrapper = shallow(<Nearby />);
      expect(wrapper.find('p')).to.have.length(1);
    });

    it('show have props', () => {
    const wrapper = shallow(<Nearby />);
    expect(wrapper.props().location).to.be.defined
     });

    it('should have an initial locationLoaded state', () => {
      const wrapper = shallow(<Nearby />);
      expect(wrapper.state().locationLoaded).to.equal(false)
    });

    it('should have an initial map state', () => {
    const wrapper = shallow(<Nearby />);
    expect(wrapper.state().map).to.equal(null);
    });

    it('should have an initial canPush state', () => {
    const wrapper = shallow(<Nearby />);
    expect(wrapper.state().canPush).to.equal(false);
    });
  });






