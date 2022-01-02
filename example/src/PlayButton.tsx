import { useAudio } from 'react-awesome-audio';

const PlayButton = ({ src }: { src: string }) => {
  const { isPlaying, toggle } = useAudio({ src: src });

  return (
    <button
      style={{ fontSize: '25px', padding: '5px 25px', cursor: 'pointer' }}
      onClick={toggle}
    >
      {isPlaying ? 'Pause' : 'Play'}
    </button>
  );
};

export default PlayButton;
