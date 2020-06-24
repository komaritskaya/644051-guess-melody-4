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
  type: string;
  genre: string;
  answers: GenreAnswer[];
}

export interface ArtistQuestion {
  type: string;
  song: Song;
  answers: ArtistAnswer[];
}
