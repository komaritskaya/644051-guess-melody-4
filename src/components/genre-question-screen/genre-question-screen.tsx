import React, {useState} from 'react';
import nanoid from 'nanoid';
import {GenreQuestion} from '../../types';

interface GenreQuestionScreenProps {
  question: GenreQuestion;
  onAnswer: (question: GenreQuestion, userAnswers: boolean[]) => void;
}

const GenreQuestionScreen: React.FC<GenreQuestionScreenProps> = ({question, onAnswer}: GenreQuestionScreenProps) => {
  const {
    answers,
    genre,
  } = question;
  const [userAnswers, setUserAnswers] = useState([false, false, false, false]);

  return (
    <section className="game game--genre">
      <header className="game__header">
        <a className="game__back" href="#">
          <span className="visually-hidden">Сыграть ещё раз</span>
          <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
        </a>

        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle className="timer__line" cx="390" cy="390" r="370"
            style={{filter: `url(#blur)`, transform: `rotate(-90deg) scaleY(-1)`, transformOrigin: `center`}}/>
        </svg>

        <div className="game__mistakes">
          <div className="wrong"></div>
          <div className="wrong"></div>
          <div className="wrong"></div>
        </div>
      </header>

      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form
          className="game__tracks"
          onSubmit={(evt): void => {
            evt.preventDefault();
            onAnswer(question, userAnswers);
          }}
        >
          {answers.map((answer, i) => {
            const answerId = nanoid();
            return (
              <div key={answerId} className="track">
                <button className="track__button track__button--play" type="button"/>
                <div className="track__status">
                  <audio
                    src={answer.src}
                  />
                </div>
                <div className="game__answer">
                  <input
                    className="game__input visually-hidden"
                    type="checkbox"
                    name="answer"
                    value={`answer-${i}`}
                    id={`answer-${i}`}
                    checked={userAnswers[i]}
                    onChange={(evt): void => {
                      const value = evt.target.checked;
                      setUserAnswers((prevUserAnswers) => ([...prevUserAnswers.slice(0, i), value, ...prevUserAnswers.slice(i + 1)]));
                    }}
                  />
                  <label className="game__check" htmlFor={`answer-${i}`}>Отметить</label>
                </div>
              </div>
            );
          })}
          <button className="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
    </section>
  );
};

export default GenreQuestionScreen;
