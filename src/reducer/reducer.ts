import {extend} from '../utils';
import {GameType, RootState, Action, ArtistQuestion, GenreQuestion, ArtistAnswer} from '../types';
import questions from '../mock/questions';

const initialState: RootState = {
  mistakes: 0,
  maxMistakes: 3,
  step: -1,
  questions,
};

const isArtistAnswerCorrect = (question: ArtistQuestion, userAnswer: ArtistAnswer) => {
  return userAnswer.artist === question.song.artist;
};

const isGenreAnswerCorrect = (question: GenreQuestion, userAnswer: boolean[]) => {
  return userAnswer.every((it, i) => {
    return it === (question.answers[i].genre === question.genre);
  });
};

const ActionCreator = {
  incrementStep: (): Action => ({
    type: `INCREMENT_STEP`,
    payload: 1,
  }),

  incrementMistake: (question: (GenreQuestion | ArtistQuestion), userAnswer: (boolean[] | ArtistAnswer)): Action => {
    let answerIsCorrect = false;

    switch (question.type) {
      case GameType.ARTIST:
        answerIsCorrect = isArtistAnswerCorrect(question, userAnswer as ArtistAnswer);
        break;
      case GameType.GENRE:
        answerIsCorrect = isGenreAnswerCorrect(question, userAnswer as boolean[]);
        break;
    }

    return {
      type: `INCREMENT_MISTAKES`,
      payload: answerIsCorrect ? 0 : 1,
    };
  },

  resetGame: () => {
    return {
      type: `RESET`,
      payload: null,
    };
  },
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case `INCREMENT_STEP`:
      return extend(state, {
        step: state.step + (action.payload as number),
      });

    case `INCREMENT_MISTAKES`:
      return extend(state, {
        mistakes: state.mistakes + (action.payload as number),
      });

    case `RESET`:
      return extend(initialState, {
        step: 0,
      });

  }

  return state;
};


export {reducer, ActionCreator};
