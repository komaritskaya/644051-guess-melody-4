import React from 'react';
import WelcomeScreen from '../welcome-screen/welcome-screen';

interface AppProps {
  errorsCount: number;
}

const App: React.FunctionComponent<AppProps> = ({errorsCount}: AppProps) => {
  return (
    <WelcomeScreen errorsCount={errorsCount} />
  );
};

export default App;
