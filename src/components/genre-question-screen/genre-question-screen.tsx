import React, {useState, ReactNode} from 'react';
import nanoid from 'nanoid';
import {GenreQuestion} from '../../types';

interface GenreQuestionScreenProps {
  question: GenreQuestion;
  onAnswer: (question: GenreQuestion, userAnswers: boolean[]) => void;
  renderPlayer: (src: string, activePlayer: number) => ReactNode;
}

const GenreQuestionScreen: React.FC<GenreQuestionScreenProps> = ({question, onAnswer, renderPlayer}: GenreQuestionScreenProps) => {
  const {
    answers,
    genre,
  } = question;
  const [userAnswers, setUserAnswers] = useState(new Array(question.answers.length).fill(false));

  return (
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
              {renderPlayer(answer.src, i)}
              <div className="game__answer">
                <input
                  className="game__input visually-hidden"
                  type="checkbox"
                  name="answer"
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
  );
};

export default GenreQuestionScreen;
