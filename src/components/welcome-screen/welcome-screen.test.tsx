import React from 'react';
import renderer from 'react-test-renderer';
import WelcomeScreen from './welcome-screen';

it(`Should WelcomeScreen render correctly`, () => {
  const tree = renderer
    .create(<WelcomeScreen
      errorsCount={3}
      onWelcomeButtonClick={(): void => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
