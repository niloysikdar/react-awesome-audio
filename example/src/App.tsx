import PlayButton from './PlayButton';
const assetSong = require('./assets/song.mp3');

const songURL =
  'https://p.scdn.co/mp3-preview/d09498fe7e41e26b90682c3b5a0819bbcc3378e2';

const App = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>
        <a
          href="https://www.npmjs.com/package/react-awesome-audio"
          target="_blank"
          rel="noreferrer"
        >
          react-awesome-audio
        </a>{' '}
        example
      </h1>
      <h2>Author: Niloy Sikdar</h2>
      <a
        href="https://github.com/niloysikdar/react-awesome-audio"
        target="_blank"
        rel="noreferrer"
      >
        <h2>GitHub Repo</h2>
      </a>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '60px',
          flexWrap: 'wrap',
          marginBottom: '80px',
        }}
      >
        <div>
          <h2>Play audio from URL</h2>
          <PlayButton src={songURL} />
        </div>

        <div>
          <h2>Play audio from assets</h2>
          <PlayButton src={assetSong} />
        </div>
      </div>

      <h3>Star the GitHub repo to keep the developer motivated ✨</h3>
    </div>
  );
};

export default App;
