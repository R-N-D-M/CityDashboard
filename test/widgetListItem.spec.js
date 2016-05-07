import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import WidgetListItem from '../client/widgetListItem';

describe('<WidgetListItem />', () => {
  it('should have a button in the component', () => {
    const wrapper = shallow(<WidgetListItem />);
    expect(wrapper.find('button')).to.have.length(1);
  });
  it('should receive props from main', () => {
    const wrapper = shallow(<WidgetListItem />); 
    expect(wrapper.props()).to.be.defined;
  });
  it('simulates click events', () => {
    const onButtonClick = sinon.spy();
    const wrapper = shallow(
      <WidgetListItem handleClick={onButtonClick} />
    );
    wrapper.find('button').simulate('click');
    expect(onButtonClick.calledOnce).to.equal(true);
  });
});