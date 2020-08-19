import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BrowserRouter} from 'react-router-dom';
import {ShowMore} from './show-more-button';
import {films} from '../../../mocks/films';

Enzyme.configure({adapter: new Adapter()});

const genre = films[0].genre;
const movies = films;
const showMore = jest.fn();


it(`button plus list`, () => {
  const tree = shallow(
      <BrowserRouter>
        <ShowMore
          films={films}
          genre={genre}
          movies={movies}
          showMore={showMore}
        />
      </BrowserRouter>).dive();

  expect(tree).toMatchSnapshot();
});
