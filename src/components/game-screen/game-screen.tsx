import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {GameType, GameState} from '../../types';
import Mistakes from '../mistakes/mistakes';
import {ActionCreator} from '../../reducers/game/game';
import {AppRoute} from '../../const';

interface GameScreenProps {
  type: GameType.ARTIST | GameType.GENRE;
  children: JSX.Element | JSX.Element[];
}

const GameScreen = ({type, children}: GameScreenProps) => {
  const mistakes = useSelector((state: GameState) => state.mistakes);

  const dispatch = useDispatch();

  const goToWelcome = () => {
    dispatch(ActionCreator.goToWelcome());
  };

  return (
    <section className={`game game--${type}`}>
      <header className="game__header">
        <Link
          className="game__back"
          to={AppRoute.ROOT}
          onClick={goToWelcome}
        >
          <span className="visually-hidden">Сыграть ещё раз</span>
          <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
        </Link>

        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle className="timer__line" cx="390" cy="390" r="370" style={{filter: `url(#blur)`, transform: `rotate(-90deg) scaleY(-1)`, transformOrigin: `center`}} />
        </svg>

        <Mistakes
          count={mistakes}
        />
      </header>

      {children}

    </section>
  );
};

export default GameScreen;
