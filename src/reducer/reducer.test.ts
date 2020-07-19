import {reducer, ActionCreator} from './reducer';
import {GameType, GenreQuestion, ArtistQuestion, Action} from '../types';

const questions: (GenreQuestion | ArtistQuestion)[] = [
  {
    type: GameType.GENRE,
    genre: `rock`,
    answers: [{
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `rock`,
    }, {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `blues`,
    }, {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `jazz`,
    }, {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `rock`,
    }],
  }, {
    type: GameType.ARTIST,
    song: {
      artist: `Jim Beam`,
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    },
    answers: [{
      picture: `https://api.adorable.io/avatars/128/A`,
      artist: `John Snow`,
    }, {
      picture: `https://api.adorable.io/avatars/128/AB`,
      artist: `Jack Daniels`,
    }, {
      picture: `https://api.adorable.io/avatars/128/AC`,
      artist: `Jim Beam`,
    }],
  },
];

const initialState = {
  step: -1,
  mistakes: 0,
  maxMistakes: 3,
  questions,
};

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(initialState, {type: `ERROR`, payload: null})).toEqual(initialState);
});

it(`Reducer should increment current step by a given value`, () => {
  expect(reducer(initialState, {
    type: `INCREMENT_STEP`,
    payload: 1,
  })).toEqual({...initialState, step: 0});

  expect(reducer(initialState, {
    type: `INCREMENT_STEP`,
    payload: 0,
  })).toEqual(initialState);
});

it(`Reducer should increment number of mistakes by a given value`, () => {
  expect(reducer(initialState, {
    type: `INCREMENT_MISTAKES`,
    payload: 1,
  })).toEqual({...initialState, mistakes: 1});

  expect(reducer(initialState, {
    type: `INCREMENT_MISTAKES`,
    payload: 0,
  })).toEqual(initialState);
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for incrementing step returns correct action`, () => {
    expect(ActionCreator.incrementStep()).toEqual({
      type: `INCREMENT_STEP`,
      payload: 1,
    } as Action);
  });

  it(`Action creator for incrementing mistake returns action with 0 payload if answer for artist is correct`, () => {
    expect(ActionCreator.incrementMistake({
      type: GameType.ARTIST,
      song: {
        artist: `correct`,
        src: ``,
      },
      answers: [
        {
          artist: `correct`,
          picture: ``,
        }, {
          artist: `incorrect`,
          picture: ``,
        }, {
          artist: `incorrect-2`,
          picture: ``,
        },
      ]
    }, {
      artist: `correct`,
      picture: ``,
    })).toEqual({
      type: `INCREMENT_MISTAKES`,
      payload: 0,
    } as Action);
  });

  it(`Action creator for incrementing mistake returns action with 1 payload if answer for artist is incorrect`, () => {
    expect(ActionCreator.incrementMistake({
      type: GameType.ARTIST,
      song: {
        artist: `correct`,
        src: ``,
      },
      answers: [
        {
          artist: `correct`,
          picture: ``,
        }, {
          artist: `incorrect`,
          picture: ``,
        }, {
          artist: `incorrect-2`,
          picture: ``,
        },
      ]
    }, {
      artist: `incorrect`,
      picture: ``,
    })).toEqual({
      type: `INCREMENT_MISTAKES`,
      payload: 1,
    } as Action);
  });

  it(`Action creator for incrementing mistake returns action with 0 payload if answer for genre is correct`, () => {
    expect(ActionCreator.incrementMistake({
      type: GameType.GENRE,
      genre: `jazz`,
      answers: [
        {
          genre: `rock`,
          src: ``,
        }, {
          genre: `jazz`,
          src: ``,
        }, {
          genre: `blues`,
          src: ``,
        }, {
          genre: `blues`,
          src: ``,
        },
      ]
    }, [false, true, false, false])).toEqual({
      type: `INCREMENT_MISTAKES`,
      payload: 0,
    } as Action);
  });

  it(`Action creator for incrementing mistake returns action with 1 payload if answer for genre is incorrect`, () => {
    expect(ActionCreator.incrementMistake({
      type: GameType.GENRE,
      genre: `jazz`,
      answers: [
        {
          genre: `blues`,
          src: ``,
        }, {
          genre: `blues`,
          src: ``,
        }, {
          genre: `blues`,
          src: ``,
        }, {
          genre: `blues`,
          src: ``,
        },
      ]
    }, [true, true, true, true])).toEqual({
      type: `INCREMENT_MISTAKES`,
      payload: 1,
    } as Action);
  });
});
