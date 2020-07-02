import React, {ReactNode} from 'react';
import nanoid from 'nanoid';
import {ArtistQuestion, ArtistAnswer} from '../../types';

interface ArtistQuestionScreenProps {
  question: ArtistQuestion;
  onAnswer: (question: ArtistQuestion, userAnswer: ArtistAnswer) => void;
  renderPlayer: (src: string, activePlayer: number) => ReactNode;
}

const ArtistQuestionScreen: React.FC<ArtistQuestionScreenProps> = ({question, onAnswer, renderPlayer}: ArtistQuestionScreenProps) => {
  const {
    answers,
    song,
  } = question;

  return (
    <section className="game__screen">
      <h2 className="game__title">Кто исполняет эту песню?</h2>
      <div className="game__track">
        <div className="track">
          {renderPlayer(song.src, 0)}
        </div>
      </div>

      <form className="game__artist">
        {answers.map((answer, i) => (
          <div className="artist" key={nanoid()}>
            <input
              className="artist__input visually-hidden"
              type="radio"
              name="answer"
              value={`artist-${i}`}
              id={`answer-${i}`}
              onChange={(evt): void => {
                evt.preventDefault();
                onAnswer(question, answer);
              }}
            />
            <label className="artist__name" htmlFor={`answer-${i}`}>
              <img className="artist__picture" src={answer.picture} alt={answer.artist} />
              {answer.artist}
            </label>
          </div>
        ))}
      </form>
    </section>
  );
};

export default ArtistQuestionScreen;
