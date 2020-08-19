import React from 'react';
import Enzyme from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import {BrowserRouter} from 'react-router-dom';
import FooterLogo from './footer-logo';

Enzyme.configure({adapter: new Adapter()});

it(`button plus list`, () => {
  const tree = renderer.create(
      <BrowserRouter>
        <FooterLogo />
      </BrowserRouter>).toJSON();

  expect(tree).toMatchSnapshot();
});
