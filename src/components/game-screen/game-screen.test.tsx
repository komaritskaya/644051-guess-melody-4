import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import GameScreen from './game-screen';
import {GameType} from '../../types';

const mockStore = configureStore([]);

const children = <div className="children-component" />;

describe(`GameScreen component is rendered correctly`, () => {
  it(`with type GameType.ARTIST`, () => {
    const store = mockStore({});

    const tree = renderer.create(
        <Provider store={store}>
          <GameScreen
            type={GameType.ARTIST}
          >
            {children}
          </GameScreen>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`with type GameType.GENRE`, () => {
    const store = mockStore({});

    const tree = renderer.create(
        <Provider store={store}>
          <GameScreen
            type={GameType.GENRE}
          >
            {children}
          </GameScreen>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
