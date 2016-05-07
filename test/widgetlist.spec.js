import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import WidgetList from '../client/widgetList';

describe('<WidgetList />', () => {
  it('should receive props from main', () => {
    const wrapper = shallow(<WidgetList />);
    expect(wrapper.props()).to.be.defined;
  });
  it('should have a button in the component', () => {
    const wrapper = shallow(<WidgetList />);
    expect(wrapper.find('button')).to.have.length(1);
  });
});