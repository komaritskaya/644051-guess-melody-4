import React, {useState} from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import WelcomeScreen from '../welcome-screen/welcome-screen';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen';
import {GameType} from '../../const';

import {Question, ArtistQuestion} from '../../types';

interface AppProps {
  errorsCount: number;
  questions: [Question, ArtistQuestion];
}

const App: React.FunctionComponent<AppProps> = ({errorsCount, questions}: AppProps) => {
  const [step, setStep] = useState(-1);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const _renderGameScreen = (): (React.ComponentElement<{}, any> | null) => {
    const question = questions[step];

    // eslint-disable-next-line react/prop-types
    if (step === -1 || step >= questions.length) {
      return (
        <WelcomeScreen
          errorsCount={errorsCount}
          onWelcomeButtonClick={(): void => setStep(0)}
        />
      );
    }

    if (question) {
      // eslint-disable-next-line react/prop-types
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
            question={questions[0]}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onAnswer={(): void => {}}
          />
        </Route>

        <Route exact path="/artist">
          <ArtistQuestionScreen
            question={questions[1]}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onAnswer={(): void => {}}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
