import React from 'react';
import {Switch, Route, Router} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {ActionCreator} from '../../reducers/game/game';
// import {AuthorizationStatus} from '../../reducers/user/user';
import WelcomeScreen from '../welcome-screen/welcome-screen';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen';
import LoseScreen from '../lose-screen/lose-screen';
import WinScreen from '../win-screen/win-screen';
import PrivateRoute from '../private-route/private-route';
import GameScreen from '../game-screen/game-screen';
import {
  GameType,
  GenreQuestion,
  ArtistQuestion,
  GameState,
  // UserState,
  DataState
} from '../../types';
import withAudioPlayer from '../../hocs/with-audio-player/with-audio-player';
// import {getStep, getMistakes, getMaxMistakes} from '../../reducers/game/selectors';
// import {getQuestions} from '../../reducers/data/selectors';
// import {getAuthorizationStatus} from '../../reducers/user/selectors';
// import {Operation as UserOperation} from '../../reducers/user/user';
import history from '../../history';
import {AppRoute} from '../../const';

const GenreQuestionScreenWrapped = withAudioPlayer(GenreQuestionScreen);
const ArtistQuestionScreenWrapped = withAudioPlayer(ArtistQuestionScreen);

const App: React.FunctionComponent = () => {
  const step = useSelector((state: GameState) => state.step);
  const maxMistakes = useSelector((state: GameState) => state.maxMistakes);
  const mistakes = useSelector((state: GameState) => state.mistakes);
  const questions = useSelector((state: DataState) => state.questions);
  // const authorizationStatus = useSelector((state: UserState) => state.authorizationStatus);

  const dispatch = useDispatch();

  const onWelcomeButtonClick = () => {
    dispatch(ActionCreator.incrementStep());
  };

  // const login = (authData) => {
  //   dispatch(UserOperation.login(authData));
  // };

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
      return (
        <WinScreen
          questionsCount={questions.length}
          mistakesCount={mistakes}
          onReplayButtonClick={resetGame}
        />
      );
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
    <Router
      history={history}
    >
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          {_renderGameScreen()}
        </Route>
        <Route exact path={AppRoute.LOGIN}>
          <AuthScreen
            onReplayButtonClick={resetGame}
            onSubmit={login}
          />
        </Route>
        <Route exact path={AppRoute.LOSE}>
          <LoseScreen
            onReplayButtonClick={resetGame}
          />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.RESULT}
          render={() => {
            return (
              <WinScreen
                questionsCount={questions.length}
                mistakesCount={mistakes}
                onReplayButtonClick={resetGame}
              />
            );
          }}
        />
        {/* <Route exact path="/genre">
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
        </Route> */}
      </Switch>
    </Router>
  );
};

export default App;
