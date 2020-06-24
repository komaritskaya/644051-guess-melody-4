import React, {useState} from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import WelcomeScreen from '../welcome-screen/welcome-screen';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen';

import {GameType, GenreQuestion, ArtistQuestion} from '../../types';

interface AppProps {
  errorsCount: number;
  questions: (GenreQuestion | ArtistQuestion)[];
}

const App: React.FunctionComponent<AppProps> = ({errorsCount, questions}: AppProps) => {
  const [step, setStep] = useState(-1);

  const _renderGameScreen = () => {
    const question = questions[step];

    if (step === -1 || step >= questions.length) {
      return (
        <WelcomeScreen
          errorsCount={errorsCount}
          onWelcomeButtonClick={(): void => setStep(0)}
        />
      );
    }

    if (question) {
      switch (question.type) {
        case GameType.GENRE:
          return (
            <GenreQuestionScreen
              question={question}
              onAnswer={(): void => setStep((prevStep) => prevStep + 1)}
            />
          );
        case GameType.ARTIST:
          return (
            <ArtistQuestionScreen
              question={question}
              onAnswer={(): void => setStep((prevStep) => prevStep + 1)}
            />
          );
      }
    }

    return null;
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {_renderGameScreen()}
        </Route>
        <Route exact path="/genre">
          <GenreQuestionScreen
            question={questions.find((question) => question.type === GameType.GENRE) as GenreQuestion}
            onAnswer={() => {}}
          />
        </Route>

        <Route exact path="/artist">
          <ArtistQuestionScreen
            question={questions.find((question) => question.type === GameType.ARTIST) as ArtistQuestion}
            onAnswer={() => {}}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
