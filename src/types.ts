export enum GameType {
  ARTIST = `artist`,
  GENRE = `genre`,
}
export interface GenreAnswer {
  src: string;
  genre: string;
}

export interface ArtistAnswer {
  picture: string;
  artist: string;
}

export interface Song {
  artist: string;
  src: string;
}

export interface GenreQuestion {
  type: GameType.GENRE;
  genre: string;
  answers: GenreAnswer[];
}

export interface ArtistQuestion {
  type: GameType.ARTIST;
  song: Song;
  answers: ArtistAnswer[];
}

export interface GameState {
  mistakes: number;
  maxMistakes: number;
  step: number;
}

export interface DataState {
  questions: (GenreQuestion | ArtistQuestion)[];
}

export interface UserState {
  authorizationStatus: string;
}

export interface GameAction {
  type: `INCREMENT_MISTAKES` | `INCREMENT_STEP` | `RESET` | `GO_TO_WELCOME` | `ERROR`;
  payload: unknown;
}

export interface DataAction {
  type: `LOAD_QUESTIONS` | `ERROR`;
  payload: unknown;
}

export interface UserAction {
  type: `REQUIRED_AUTHORIZATION` | `ERROR`;
  payload: unknown;
}
