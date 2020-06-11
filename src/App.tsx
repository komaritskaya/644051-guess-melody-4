import React from 'react';

interface AppProps {
  name: string;
}

interface AppState {
  age?: number;
  cities: string[];
}

class App extends React.Component<AppProps, AppState> {
  state = {
    age: 111,
    cities: [] as string[],
  };

  render(): JSX.Element {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}

export default App;
