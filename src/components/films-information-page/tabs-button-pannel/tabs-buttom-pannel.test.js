import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BrowserRouter} from 'react-router-dom';
import HeaderTabs from './tabs-button-pannel';
import {films} from '../../../mocks/films';

Enzyme.configure({adapter: new Adapter()});

const movieId = films[0].id;
const name = films[0].name;
const genre = `All genres`;
const released = films[0].released;
const isAutorized = true;

it(`button plus list`, () => {
  const tree = shallow(
      <BrowserRouter>
        <HeaderTabs
          name={name}
          genre={genre}
          released={released}
          isAutorized={isAutorized}
          movieId={movieId}
        />
      </BrowserRouter>).dive();

  expect(tree).toMatchSnapshot();
});
