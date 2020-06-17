import React from 'react';
import WelcomeScreen from '../welcome-screen/welcome-screen';

interface AppProps {
  errorsCount: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const welcomeButtonHandler = (): void => {};

const App: React.FunctionComponent<AppProps> = ({errorsCount}: AppProps) => {
  return (
    <WelcomeScreen
      errorsCount={errorsCount}
      onWelcomeButtonClick={welcomeButtonHandler}
    />
  );
};

export default App;
