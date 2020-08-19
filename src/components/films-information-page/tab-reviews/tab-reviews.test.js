import React from 'react';
import Enzyme from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import {BrowserRouter} from 'react-router-dom';
import {Review} from './tab-reviews';

Enzyme.configure({adapter: new Adapter()});

const comments = [{
  'id': 1,
  'user': {
    'id': 19,
    'name': `Christina`
  },
  'rating': 3.9,
  'comment': `It was well acted, directed.`,
  'date': `2020-08-05T20:09:08.102Z`
}, {
  'id': 2,
  'user': {
    'id': 14,
    'name': `Corey`
  },
  'rating': 7,
  'comment': `I really find it difficult to believe this movie`,
  'date': `2020-08-08T20:09:08.102Z`
}, {
  'id': 3,
  'user': {
    'id': 14,
    'name': `Corey`
  },
  'rating': 7.5,
  'comment': `Poised to be an instant classic`,
  'date': `2020-08-06T20:09:08.102Z`
}];

it(`button plus list`, () => {
  const tree = renderer.create(
      <BrowserRouter>
        <Review
          comments={comments}
        />
      </BrowserRouter>).toJSON();

  expect(tree).toMatchSnapshot();
});
