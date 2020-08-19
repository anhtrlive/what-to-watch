import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import {ButtonPlusList} from './button-plus-list';
import {films} from '../../mocks/films';

Enzyme.configure({adapter: new Adapter()});

const bookmarks = [films[0].name, films[1].name, films[2].name];
const movieId = films[0].id;
const name = films[0].name;
const switchFavorite = jest.fn();

it(`button plus list`, () => {
  const tree = renderer.create(
      <ButtonPlusList
        bookmarks={bookmarks}
        movieId={movieId}
        name={name}
        switchFavorite={switchFavorite}
      />).toJSON();

  expect(tree).toMatchSnapshot();
});
