import React from 'react';
import renderer from 'react-test-renderer';
import LoseScreen from './lose-screen';

it(`Should LoseScreen render correctly`, () => {
  const tree = renderer
    .create(<LoseScreen
      onReplayButtonClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
