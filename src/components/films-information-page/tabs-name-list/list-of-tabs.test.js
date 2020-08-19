import React from 'react';
import Enzyme from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import {BrowserRouter} from 'react-router-dom';
import {ListOftabs} from './list-of-tabs';

Enzyme.configure({adapter: new Adapter()});

const activeTab = `Details`;

it(`button plus list`, () => {
  const tree = renderer.create(
      <BrowserRouter>
        <ListOftabs
          activeTab={activeTab}
        />
      </BrowserRouter>).toJSON();

  expect(tree).toMatchSnapshot();
});
