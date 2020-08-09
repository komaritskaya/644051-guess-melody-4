import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import configureStore from 'redux-mock-store';
import GameScreen from './game-screen';
import {GameType} from '../../types';
import history from '../../history';

const mockStore = configureStore([]);

const children = <div className="children-component" />;

describe(`GameScreen component is rendered correctly`, () => {
  it(`with type GameType.ARTIST`, () => {
    const store = mockStore({});

    const tree = renderer.create(
        <Provider store={store}>
          <Router
            history={history}
          >
            <GameScreen
              type={GameType.ARTIST}
            >
              {children}
            </GameScreen>
          </Router>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`with type GameType.GENRE`, () => {
    const store = mockStore({});

    const tree = renderer.create(
        <Provider store={store}>
          <Router
            history={history}
          >
            <GameScreen
              type={GameType.GENRE}
            >
              {children}
            </GameScreen>
          </Router>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
