import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BrowserRouter} from 'react-router-dom';
import HeaderTabPage from './header-tabs-page';
import {films} from '../../../mocks/films';

Enzyme.configure({adapter: new Adapter()});

const genre = `All genres`;
const backgroundImage = films[0].backgroundImage;
const isAutorized = true;
const movieId = films[0].id;
const name = films[0].name;
const released = films[0].released;

it(`button plus list`, () => {
  const tree = shallow(
      <BrowserRouter>
        <HeaderTabPage
          backgroundImage={backgroundImage}
          films={films}
          genre={genre}
          isAutorized={isAutorized}
          movieId={movieId}
          name={name}
          released={released}
        />
      </BrowserRouter>).dive();

  expect(tree).toMatchSnapshot();
});
