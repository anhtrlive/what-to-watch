import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BrowserRouter} from 'react-router-dom';
import {MainPage} from './main-page';
import {films} from '../../mocks/films';

Enzyme.configure({adapter: new Adapter()});

const genre = films[0].genre;
const movies = films;
const showMore = jest.fn();
const clickHandlerGenre = jest.fn();
const resetShowCard = jest.fn();
const isAutorized = true;

it(`button plus list`, () => {
  const tree = shallow(
      <BrowserRouter>
        <MainPage
          films={films}
          genre={genre}
          movies={movies}
          showMore={showMore}
          clickHandlerGenre={clickHandlerGenre}
          resetShowCard={resetShowCard}
          isAutorized={isAutorized}
        />
      </BrowserRouter>).dive();

  expect(tree).toMatchSnapshot();
});
