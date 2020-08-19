import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import {films} from '../../mocks/films';
import {MyList} from './my-list';
import {BrowserRouter} from 'react-router-dom';

Enzyme.configure({adapter: new Adapter()});

const bookmarks = [films[0].name, films[1].name, films[2].name];
const isAutorized = true;

it(`button plus list`, () => {
  const tree = renderer.create(
      <BrowserRouter>
        <MyList
          bookmarks={bookmarks}
          isAutorized={isAutorized}
          films={films}
        />
      </BrowserRouter>).toJSON();

  expect(tree).toMatchSnapshot();
});
