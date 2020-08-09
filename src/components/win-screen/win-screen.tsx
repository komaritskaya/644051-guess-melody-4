import React from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

interface WinScreenProps {
  questionsCount: number;
  mistakesCount: number;
  onReplayButtonClick: () => void;
}

const WinScreen: React.FC<WinScreenProps> = ({questionsCount, mistakesCount, onReplayButtonClick}) => {
  const correctQuestionsCount = questionsCount - mistakesCount;

  return (
    <section className="result">
      <div className="result__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
      </div>
      <h2 className="result__title">Вы настоящий меломан!</h2>
      <p className="result__total">Вы ответили правильно на {correctQuestionsCount} вопросов и совершили {mistakesCount} ошибки</p>
      <Link
        to={AppRoute.ROOT}
        className="replay"
        onClick={onReplayButtonClick}
      >
        Сыграть ещё раз
      </Link>
    </section>
  );
};

export default WinScreen;
