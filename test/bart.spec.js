import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import Axios from 'axios';
import Bart from '../client/widgets/bart';
describe('<Bart />', () => {
  
  it('should have a div in the component to display the next trains leaving', () => {
    const wrapper = shallow(<Bart />);
    expect(wrapper.find('div')).to.have.length(1);
  });
  it('should have a destinations className in div wrapper', () => {
    const wrapper = shallow(<Bart />);
    expect(wrapper.find('.destinations')).to.exist;
  });
  it('should have a directions className in div wrapper', () => {
    const wrapper = shallow(<Bart />);
    expect(wrapper.find('.directions')).to.exist;
  });
  it('should have a platforms className in div wrapper', () => {
    const wrapper = shallow(<Bart />);
    expect(wrapper.find('.platforms')).to.exist;
  });
  it('should have a times className in div wrapper', () => {
    const wrapper = shallow(<Bart />);
    expect(wrapper.find('.times')).to.exist;
  });
  it('should receive props from main', () => {
    const wrapper = shallow(<Bart />); 
    expect(wrapper.props().locationTrue).to.be.defined;
  });
});
describe('<Bart />', () => {
  it('should mount <Bart /> component', () => {
  const willMount = sinon.spy();
  const didMount = sinon.spy();
  const willUnmount = sinon.spy();

  class Bart extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        locationTrue: ["Waiting on location data (async delay)...", "Waiting on location data (async delay)..."],
        nextTrains: []
      };
      this.componentWillUnmount = willUnmount;
      this.componentWillMount = willMount;
      this.componentDidMount = didMount;
    }

    render() {
      let TrainsData;
      let that = this;
      if(that.state.nextTrains.length > 0){
        TrainsData = that.state.nextTrains.map((trains) => {
          return (
            <div>
              <span className="destinations">Destination: {trains.destination} </span>
              <span className="directions">Direction: {trains.direction} </span>
              <span className="platforms">Platform #: {trains.platform} </span>
              <span className="times">Minutes Until: {trains.time} </span>
            </div>
          );
        });
      }
      if (!this.state.locationTrue) {
        return <div></div>;
      } else {
        return (
           <div className='bart'style={{
            width: "50%",
            border: "2px dotted green",
            margin: "8px",
            float: "left"
          }}>
            <div className="TrainsData">{TrainsData}</div>
          </div>
        );
      }
    }
  }
  const wrapper = mount(<Bart />);
  expect(willMount.callCount).to.equal(1);
  expect(didMount.callCount).to.equal(1);
  expect(willUnmount.callCount).to.equal(0);
  wrapper.unmount();
  expect(willMount.callCount).to.equal(1);
  expect(didMount.callCount).to.equal(1);
  expect(willUnmount.callCount).to.equal(1);
  wrapper.mount();
  expect(willMount.callCount).to.equal(2);
  expect(didMount.callCount).to.equal(2);
  expect(willUnmount.callCount).to.equal(1);

  })
});