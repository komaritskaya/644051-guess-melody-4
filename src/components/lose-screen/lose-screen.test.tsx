import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';
import LoseScreen from './lose-screen';
import history from '../../history';

it(`Should LoseScreen render correctly`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <LoseScreen
            onReplayButtonClick={() => {}}
          />
        </Router>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
