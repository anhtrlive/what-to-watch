import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BrowserRouter} from 'react-router-dom';
import {MovieCard} from './small-movie-card';
import {films} from '../../mocks/films';

Enzyme.configure({adapter: new Adapter()});

const movieName = films[0].name;
const img = films[0].posterImage;
const previewVideoLink = films[0].previewVideoLink;
const isAutorized = true;
const isPlaying = false;
const handleCardMouseEnter = jest.fn();
const handleCardonMouseLeave = jest.fn();

it(`button plus list`, () => {
  const tree = shallow(
      <BrowserRouter>
        <MovieCard
          movieName={movieName}
          img={img}
          previewVideoLink= {previewVideoLink}
          isAutorized={isAutorized}
          isPlaying= {isPlaying}
          handleCardMouseEnter={handleCardMouseEnter}
          handleCardonMouseLeave={handleCardonMouseLeave}
        />
      </BrowserRouter>).dive();

  expect(tree).toMatchSnapshot();
});
