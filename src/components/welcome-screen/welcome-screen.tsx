import React from 'react';

interface WelcomeScreenProps {
  errorsCount: number;
}

const getErrorsText = (count: number): string => {
  const lastDigit = Number(count.toString().slice(-1));
  if (lastDigit === 1) {
    return `${count} ошибку`;
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return `${count} ошибки`;
  } else {
    return `${count} ошибок`;
  }
};

const WelcomeScreen: React.FunctionComponent<WelcomeScreenProps> = ({errorsCount}: WelcomeScreenProps) => {
  const errorsText = getErrorsText(errorsCount);

  return (
    <section className="welcome">
      <div className="welcome__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" /></div>
      <button className="welcome__button"><span className="visually-hidden">Начать игру</span></button>
      <h2 className="welcome__rules-title">Правила игры</h2>
      <p className="welcome__text">Правила просты:</p>
      <ul className="welcome__rules-list">
        <li>Нужно ответить на все вопросы.</li>
        <li>Можно допустить {errorsText}.</li>
      </ul>
      <p className="welcome__text">Удачи!</p>
    </section>
  );
};

export default WelcomeScreen;
