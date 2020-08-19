import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import {ButtonCheckList} from './button-check-list';
import {films} from '../../mocks/films';
import {BrowserRouter} from 'react-router-dom';

Enzyme.configure({adapter: new Adapter()});

const switchFavorite = jest.fn();
const movieId = films[0].id;

it(`button check list`, () => {
  const tree = renderer.create(
      <BrowserRouter>
        <ButtonCheckList
          switchFavorite={switchFavorite}
          movieId={movieId}
        />
      </BrowserRouter>).toJSON();

  expect(tree).toMatchSnapshot();
});
