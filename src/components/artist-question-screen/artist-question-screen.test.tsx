import React from 'react';
import renderer from 'react-test-renderer';
import ArtistQuestionScreen from './artist-question-screen';
import {GameType, ArtistQuestion} from '../../types';

const question: ArtistQuestion = {
  type: GameType.ARTIST,
  song: {
    artist: `Jim Beam`,
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
  },
  answers: [{
    picture: `https://api.adorable.io/avatars/128/0`,
    artist: `John Snow`,
  }, {
    picture: `https://api.adorable.io/avatars/128/1`,
    artist: `Jack Daniels`,
  }, {
    picture: `https://api.adorable.io/avatars/128/2`,
    artist: `Jim Beam`,
  }],
};

it(`ArtistQuestionScreen is rendered correctly`, () => {
  const tree = renderer.create(
      <ArtistQuestionScreen
        question={question}
        onAnswer={(): void => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
