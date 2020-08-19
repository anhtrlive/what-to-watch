import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BrowserRouter} from 'react-router-dom';
import {SingIn} from './sing-in';

Enzyme.configure({adapter: new Adapter()});

const autorized = jest.fn();
const isAutorized = true;
const history = {};
history.goBack = jest.fn();

it(`button plus list`, () => {
  const tree = shallow(
      <BrowserRouter>
        <SingIn
          autorized={autorized}
          isAutorized={isAutorized}
          history= {history}
        />
      </BrowserRouter>).dive();

  expect(tree).toMatchSnapshot();
});
