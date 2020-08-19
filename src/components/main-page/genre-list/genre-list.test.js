import React from 'react';
import Enzyme from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import {BrowserRouter} from 'react-router-dom';
import {GenreList} from './genre-list';
import {films} from '../../../mocks/films';

Enzyme.configure({adapter: new Adapter()});

const genre = films[0].genre;
const clickHandlerGenre = jest.fn();
const resetShowCard = jest.fn();

it(`button plus list`, () => {
  const tree = renderer.create(
      <BrowserRouter>
        <GenreList
          films={films}
          genre={genre}
          clickHandlerGenre={clickHandlerGenre}
          resetShowCard={resetShowCard}
        />
      </BrowserRouter>).toJSON();

  expect(tree).toMatchSnapshot();
});
