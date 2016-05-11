import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import {ref} from '../client/helpers/constants';
import NavBar from '../client/navBar';

import Main from '../client/main';

// // import Weather from '../client/weather';

// import ReactGridLayout from 'react-grid-layout';
// import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
// // import WidthProvider from 'react-grid-layout'.WidthProvider;
// let WidthProvider = ReactGridLayout.WidthProvider;
// // import ResponsiveReactGridLayout from 'react-grid-layout'.Responsive;
// let ResponsiveReactGridLayout = ReactGridLayout.Responsive;
// ResponsiveReactGridLayout = WidthProvider(ResponsiveReactGridLayout);

// describe('<Main />', function () {
//   it('should have a ResponsiveReactGridLayout child component', function () {
//     const wrapper = shallow(<Main />);
//     expect(wrapper.find(ResponsiveReactGridLayout)).to.have.length(1);
//   });
// });