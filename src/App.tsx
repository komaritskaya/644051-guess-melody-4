import React from 'react';

interface IAppProps {
  name: string;
}

interface IAppState {
  age?: number;
  cities: string[];
}

class App extends React.Component<IAppProps, IAppState> {
  state = {
    age: 111,
    cities: [] as string[],
  };

  render(){
    return <h1>Hello, {this.props.name}!</h1>
  }
}

export default App;
