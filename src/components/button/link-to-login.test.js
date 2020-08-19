import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import LinkLoginPlusList from './link-to-login';
import {BrowserRouter} from 'react-router-dom';

Enzyme.configure({adapter: new Adapter()});


it(`link to login`, () => {
  const tree = renderer.create(
      <BrowserRouter>
        <LinkLoginPlusList />
      </BrowserRouter>).toJSON();

  expect(tree).toMatchSnapshot();
});
