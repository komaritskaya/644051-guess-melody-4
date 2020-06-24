export interface Answer {
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

export interface Question {
  type: string;
  genre: string;
  answers: Answer[];
}

export interface ArtistQuestion {
  type: string;
  song: Song;
  answers: ArtistAnswer[];
}
