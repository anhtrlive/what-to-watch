import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {AddNewReview} from './add-new-review-page';
import {films} from '../../mocks/films';
import {BrowserRouter} from 'react-router-dom';

Enzyme.configure({adapter: new Adapter()});

const addReview = jest.fn();
const history = {};
history.goback = jest.fn();
const isAutorized = true;
const pathMovieName = films[0].name.toLowerCase().split(` `).join(`-`);

it(`add new review page`, () => {
  const tree = mount(
      <BrowserRouter>
        <AddNewReview
          addReview={addReview}
          films={films}
          history={history}
          isAutorized={isAutorized}
          pathMovieName={pathMovieName}
        />
      </BrowserRouter>).dive();

  expect(tree).toMatchSnapshot();
});
