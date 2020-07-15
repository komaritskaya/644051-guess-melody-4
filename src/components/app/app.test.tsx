import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import App from './app';
import questions from '../../mock/questions';

const mockStore = configureStore([]);

describe(`Render App`, () => {
  it(`Render WelcomeScreen`, () => {
    const store = mockStore({
      mistakes: 0,
      step: 0,
      questions,
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <App />
          </Provider>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render GenreQuestionScreen`, () => {
    const store = mockStore({
      mistakes: 3,
      step: 1,
      questions,
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <App />
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
