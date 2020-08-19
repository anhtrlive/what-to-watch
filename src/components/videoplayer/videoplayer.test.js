import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BrowserRouter} from 'react-router-dom';
import {VideoPlayer} from './videoplayer';
import {films} from '../../mocks/films';

Enzyme.configure({adapter: new Adapter()});

const pathMovieName = films[0].name.toLowerCase().split(` `).join(`-`);

it(`button plus list`, () => {
  const tree = shallow(
      <BrowserRouter>
        <VideoPlayer
          films={films}
          pathMovieName={pathMovieName}
        />
      </BrowserRouter>).dive();

  expect(tree).toMatchSnapshot();
});
