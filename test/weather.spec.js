import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import Sinon from 'sinon';
import Axios from 'axios';

import Weather from '../client/widgets/weather';


  describe('<Weather />', () => {
    it('should have a nested div in the component to display current weather', () => {
      const wrapper = shallow(<Weather />);
      expect(wrapper.find('div')).to.have.length(1);
    });

    it('should have a paragraph element to display loading when current location is temporarily unavailable', () => {
      const wrapper = shallow(<Weather />);
      expect(wrapper.find('p')).to.have.length(1);
    });

    it('show have props', () => {
      const wrapper = shallow(<Weather />);
      expect(wrapper.props().location).to.be.defined
     });

    it('should have a className called locationTrue', () => {
      const wrapper = shallow(<Weather />);
      expect(wrapper.find('.locationTrue')).to.exist
    });

    it('should have a className called city', () => {
      const wrapper = shallow(<Weather />);
      expect(wrapper.find('.city')).to.exist
    });

    it('should have a className called description', () => {
      const wrapper = shallow(<Weather />);
      expect(wrapper.find('.description')).to.exist
    });

    it('should have a className called currentTemp', () => {
      const wrapper = shallow(<Weather />);
      expect(wrapper.find('.currentTemp')).to.exist
    });

    it('should have a className called maxTemp', () => {
      const wrapper = shallow(<Weather />);
      expect(wrapper.find('.maxTemp')).to.exist
    });

    it('should have a className called minTemp', () => {
      const wrapper = shallow(<Weather />);
      expect(wrapper.find('.minTemp')).to.exist
    });

    it('should have a className called humidity', () => {
      const wrapper = shallow(<Weather />);
      expect(wrapper.find('.humidity')).to.exist
    });

    it('should have a className called pressure', () => {
      const wrapper = shallow(<Weather />);
      expect(wrapper.find('.pressure')).to.exist
    });

    it('should have a className called winddegree', () => {
      const wrapper = shallow(<Weather />);
      expect(wrapper.find('.winddegree')).to.exist
    });

    it('should have a className called windspeed', () => {
      const wrapper = shallow(<Weather />);
      expect(wrapper.find('.windspeed')).to.exist
    });
  });

