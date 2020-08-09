import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import App from './app';
import questions from '../../mock/questions';
import NameSpace from '../../reducers/name-space';
import {AuthorizationStatus} from '../../reducers/user/user';

const mockStore = configureStore([]);

describe(`Render App`, () => {
  it(`Render WelcomeScreen`, () => {
    const store = mockStore({
      [NameSpace.GAME]: {
        mistakes: 0,
        step: 0,
      },
      [NameSpace.DATA]: {
        questions,
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <App />
          </Provider>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
