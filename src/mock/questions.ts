import {GenreQuestion, ArtistQuestion, GameType} from "../types";

const AVATAR_URL = `https://api.adorable.io/avatars/128`;

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
  },
  {
    type: GameType.ARTIST,
    song: {
      artist: `Jim Beam`,
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    },
    answers: [{
      picture: `${AVATAR_URL}/A`,
      artist: `John Snow`,
    }, {
      picture: `${AVATAR_URL}/AB`,
      artist: `Jack Daniels`,
    }, {
      picture: `${AVATAR_URL}/AC`,
      artist: `Jim Beam`,
    }],
  }
];

export default questions;
