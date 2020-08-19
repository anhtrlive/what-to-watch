import React from 'react';
import Enzyme from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import {BrowserRouter} from 'react-router-dom';
import {Overview} from './tab-overview';
import {films} from '../../../mocks/films';

Enzyme.configure({adapter: new Adapter()});

const stringRaiting = films[0].stringRaiting;
const rating = films[0].rating;
const description = films[0].description;
const director = films[0].director;
const starrings = films[0].starrings;
const scoresCount = films[0].scoresCount;

it(`button plus list`, () => {
  const tree = renderer.create(
      <BrowserRouter>
        <Overview
          stringRaiting={stringRaiting}
          rating={rating}
          description={description}
          director={director}
          starrings={starrings}
          scoresCount={scoresCount}
        />
      </BrowserRouter>).toJSON();

  expect(tree).toMatchSnapshot();
});
