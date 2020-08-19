import React from 'react';
import Enzyme from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import {BrowserRouter} from 'react-router-dom';
import {Details} from './tab-details';
import {films} from '../../../mocks/films';

Enzyme.configure({adapter: new Adapter()});

const genre = `All genres`;
const starrings = films[0].starrings;
const runTime = films[0].runTime;
const director = films[0].director;
const released = films[0].released;

it(`button plus list`, () => {
  const tree = renderer.create(
      <BrowserRouter>
        <Details
          starrings={starrings}
          runTime={runTime}
          genre={genre}
          released={released}
          director={director}
        />
      </BrowserRouter>).toJSON();

  expect(tree).toMatchSnapshot();
});
