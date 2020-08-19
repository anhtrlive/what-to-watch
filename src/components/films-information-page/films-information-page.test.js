import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BrowserRouter} from 'react-router-dom';
import TabsIformation from './films-information-page';
import {films} from '../../mocks/films';

Enzyme.configure({adapter: new Adapter()});

const activeTab = `Overview`;
const movieId = films[0].id;
const name = films[0].name;
const genre = `All genres`;
const released = films[0].released;
const isAutorized = true;
const loadComments = jest.fn();
const pathMovieName = films[0].name.toLowerCase().split(` `).join(`-`);

it(`button plus list`, () => {
  const tree = shallow(
      <BrowserRouter>
        <TabsIformation
          activeTab={activeTab}
          name={name}
          genre={genre}
          released={released}
          isAutorized={isAutorized}
          movieId={movieId}
          loadComments={loadComments}
          pathMovieName={pathMovieName}
        />
      </BrowserRouter>).dive();

  expect(tree).toMatchSnapshot();
});
