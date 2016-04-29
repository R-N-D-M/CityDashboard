import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';


import Main from '../client/main';
import Weather from '../client/weather';

describe('<Main />', function () {
  it('should have a Weather child component', function () {
    const wrapper = shallow(<Main />);
    expect(wrapper.find(Weather)).to.have.length(1);
  });
});
