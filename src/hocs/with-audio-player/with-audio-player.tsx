import React, {PureComponent} from 'react';
import AudioPlayer from '../../components/audio-player/audio-player';

interface WithActivePlayerState {
  activePlayerId: number;
}

const withActivePlayer = (Component) => {
  class WithActivePlayer extends PureComponent<unknown, WithActivePlayerState> {
    constructor(props) {
      super(props);

      this.state = {
        activePlayerId: 0,
      };
    }

    render() {
      const {activePlayerId} = this.state;

      return (
        <Component
          {...this.props}
          renderPlayer={(src, id) => (
            <AudioPlayer
              src={src}
              isPlaying={id === activePlayerId}
              onPlayButtonClick={() => this.setState({
                activePlayerId: activePlayerId === id ? -1 : id
              })}
            />
          )}
        />
      );
    }
  }

  return WithActivePlayer;
};

export default withActivePlayer;
