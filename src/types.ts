export interface Answer {
  src: string;
  genre: string;
}

export interface Question {
  type: string;
  genre: string;
  answers: Answer[];
}
