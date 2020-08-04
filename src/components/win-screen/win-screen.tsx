import React from 'react';

interface WinScreenProps {
  questionsCount: number;
  mistakesCount: number;
  onReplayButtonClick: () => void;
}

const WinScreen = ({questionsCount, mistakesCount, onReplayButtonClick}) => {
  const correctQuestionsCount = questionsCount - mistakesCount;

  return (
    <section className="result">
      <div className="result__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
      </div>
      <h2 className="result__title">Вы настоящий меломан!</h2>
      <p className="result__total">Вы ответили правильно на {correctQuestionsCount} вопросов и совершили {mistakesCount} ошибки</p>
      <button
        className="replay"
        type="button"
        onClick={onReplayButtonClick}
      >
        Сыграть ещё раз
      </button>
    </section>
  );
};

export default WinScreen;
