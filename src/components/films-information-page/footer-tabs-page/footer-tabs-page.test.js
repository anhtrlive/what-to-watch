import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import FooterTabsPage from './footer-tabs-page';
import {films} from '../../../mocks/films';

Enzyme.configure({adapter: new Adapter()});

const genre = `All genres`;
const moreLikeThis = [films[0], films[1], films[2]];

it(`button plus list`, () => {
  const tree = renderer.create(
      <BrowserRouter>
        <FooterTabsPage
          genre={genre}
          moreLikeThis={moreLikeThis}
        />
      </BrowserRouter>).toJSON();

  expect(tree).toMatchSnapshot();
});
