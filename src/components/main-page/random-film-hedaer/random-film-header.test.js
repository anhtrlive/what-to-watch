import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BrowserRouter} from 'react-router-dom';
import {ShowRanmdomFile} from './random-film-header';
import {films} from '../../../mocks/films';

Enzyme.configure({adapter: new Adapter()});

const isAutorized = true;

it(`button plus list`, () => {
  const tree = shallow(
      <BrowserRouter>
        <ShowRanmdomFile
          films={films}
          isAutorized={isAutorized}
        />
      </BrowserRouter>).dive();

  expect(tree).toMatchSnapshot();
});
