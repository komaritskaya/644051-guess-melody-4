import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {ActionCreator} from '../../reducers/game/game';
import {AuthorizationStatus} from '../../reducers/user/user';
import WelcomeScreen from '../welcome-screen/welcome-screen';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen';
import LoseScreen from '../lose-screen/lose-screen';
import WinScreen from '../win-screen/win-screen';
import GameScreen from '../game-screen/game-screen';
import AuthScreen from '../auth-screen/auth-screen';
import {
  GameType,
  GenreQuestion,
  ArtistQuestion,
  GameState,
  UserState,
  DataState
} from '../../types';
import withAudioPlayer from '../../hocs/with-audio-player/with-audio-player';
// import {getStep, getMistakes, getMaxMistakes} from '../../reducers/game/selectors';
// import {getQuestions} from '../../reducers/data/selectors';
// import {getAuthorizationStatus} from '../../reducers/user/selectors';
import {Operation as UserOperation} from '../../reducers/user/user';
import NameSpace from '../../reducers/name-space';


const GenreQuestionScreenWrapped = withAudioPlayer(GenreQuestionScreen);
const ArtistQuestionScreenWrapped = withAudioPlayer(ArtistQuestionScreen);

const App: React.FunctionComponent = () => {
  const step = useSelector((state: GameState) => state[NameSpace.GAME].step);
  const maxMistakes = useSelector((state: GameState) => state[NameSpace.GAME].maxMistakes);
  const mistakes = useSelector((state: GameState) => state[NameSpace.GAME].mistakes);
  const questions = useSelector((state: DataState) => state[NameSpace.DATA].questions);
  const authorizationStatus = useSelector((state: UserState) => state[NameSpace.USER].authorizationStatus);

  const dispatch = useDispatch();

  const onWelcomeButtonClick = () => {
    dispatch(ActionCreator.incrementStep());
  };

  const login = (authData) => {
    dispatch(UserOperation.login(authData));
  };

  const resetGame = () => {
    dispatch(ActionCreator.resetGame());
  };

  const onUserAnswer = (question, answer) => {
    dispatch(ActionCreator.incrementMistake(question, answer));
    dispatch(ActionCreator.incrementStep());
  };

  const _renderGameScreen = () => {
    const question = questions[step];

    if (step === -1) {
      return (
        <WelcomeScreen
          errorsCount={maxMistakes}
          onWelcomeButtonClick={onWelcomeButtonClick}
        />
      );
    }

    if (mistakes >= maxMistakes) {
      return (
        <LoseScreen
          onReplayButtonClick={resetGame}
        />
      );
    }

    if (step >= questions.length) {
      if (authorizationStatus === AuthorizationStatus.AUTH) {
        return (
          <WinScreen
            questionsCount={questions.length}
            mistakesCount={mistakes}
            onReplayButtonClick={resetGame}
          />
        );
      } else if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
        return (
          <AuthScreen
            onReplayButtonClick={resetGame}
            onSubmit={login}
          />
        );
      }

      return null;
    }

    if (question) {
      switch (question.type) {
        case GameType.GENRE:
          return (
            <GameScreen type={question.type}>
              <GenreQuestionScreenWrapped
                question={question}
                onAnswer={onUserAnswer}
              />
            </GameScreen>
          );
        case GameType.ARTIST:
          return (
            <GameScreen type={question.type}>
              <ArtistQuestionScreenWrapped
                question={question}
                onAnswer={onUserAnswer}
              />
            </GameScreen>
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
          <GenreQuestionScreenWrapped
            question={questions.find((question) => question.type === GameType.GENRE) as GenreQuestion}
            onAnswer={() => {}}
          />
        </Route>

        <Route exact path="/artist">
          <ArtistQuestionScreenWrapped
            question={questions.find((question) => question.type === GameType.ARTIST) as ArtistQuestion}
            onAnswer={() => {}}
          />
        </Route>
        <Route exact path="/dev-auth">
          <AuthScreen
            onReplayButtonClick={() => {}}
            onSubmit={() => {}}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
