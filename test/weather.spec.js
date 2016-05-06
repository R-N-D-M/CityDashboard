import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import Sinon from 'sinon';
import Axios from 'axios';

import Weather from '../client/widgets/weather';


  describe('<Weather />', function() {
    it('should have a nested div in the component to display current weather', function() {
      const wrapper = shallow(<Weather />);
      expect(wrapper.find('div')).to.have.length(1);
    });
    it('should have a paragraph element to display loading when current location is temporarily unavailable', function() {
      const wrapper = shallow(<Weather />);
      expect(wrapper.find('p')).to.have.length(1);
    });
    it('show have props', function() {
      const wrapper = shallow(<Weather />);
      expect(wrapper.props().location).to.be.defined
     });
  });

