import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import ButtonPlayVideo from './button-play-video';
import {films} from '../../mocks/films';
import {BrowserRouter} from 'react-router-dom';

Enzyme.configure({adapter: new Adapter()});

const pathMovieName = films[0].name.toLowerCase().split(` `).join(`-`);

it(`play button video`, () => {
  const tree = renderer.create(
      <BrowserRouter>
        <ButtonPlayVideo
          pathName={pathMovieName}
        />
      </BrowserRouter>).toJSON();

  expect(tree).toMatchSnapshot();
});
