import React, {useState, ReactNode} from 'react';
import nanoid from 'nanoid';
import GenreQuestionItem from '../genre-question-item/genre-question-item';
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

  const handleChange = (i, value) => {
    const newAnswers = userAnswers.slice(0);
    newAnswers[i] = value;

    setUserAnswers(newAnswers);
  };

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
            <GenreQuestionItem
              answer={answer}
              id={i}
              key={answerId}
              onChange={handleChange}
              renderPlayer={renderPlayer}
              userAnswer={userAnswers[i]}
            />
          );
        })}
        <button className="game__submit button" type="submit">Ответить</button>
      </form>
    </section>
  );
};

export default GenreQuestionScreen;
