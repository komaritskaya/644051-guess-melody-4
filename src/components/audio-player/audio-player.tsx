import React, {useState, useRef, useEffect} from 'react';

interface AudioPlayerProps {
  src: string;
  isPlaying: boolean;
  onPlayButtonClick: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({src, isPlaying, onPlayButtonClick}) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef<HTMLAudioElement | undefined>();

  useEffect(() => {
    const audio = audioRef.current;
    audio.src = src;

    const onPlayHandler = () => setLoading(false);
    audio.addEventListener(`canplaythrough`, onPlayHandler);

    const timeUpdateHandler = () => setProgress(audio.currentTime);
    audio.addEventListener(`timeupdate`, timeUpdateHandler);

    return () => {
      audio.removeEventListener(`canplaythrough`, onPlayHandler);
      audio.removeEventListener(`timeupdate`, timeUpdateHandler);
    };
  }, [audioRef, setLoading, setProgress, src]);

  useEffect(() => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [audioRef, isPlaying]);

  return (
    <React.Fragment>
      <button
        className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
        type="button"
        disabled={loading}
        onClick={onPlayButtonClick}
      />
      <div className="track__status">
        <audio ref={audioRef} />
      </div>
    </React.Fragment>
  );
};

export default AudioPlayer;
