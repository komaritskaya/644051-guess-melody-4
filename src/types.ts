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
