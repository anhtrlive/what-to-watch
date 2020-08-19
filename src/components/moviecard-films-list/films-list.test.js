import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BrowserRouter} from 'react-router-dom';
import {FilmsList} from './films-list';
import {films} from '../../mocks/films';

Enzyme.configure({adapter: new Adapter()});

const genre = films[0].genre;
const movies = films;

it(`button plus list`, () => {
  const tree = shallow(
      <BrowserRouter>
        <FilmsList
          genre={genre}
          movies={movies}
        />
      </BrowserRouter>).dive();

  expect(tree).toMatchSnapshot();
});
