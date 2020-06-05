import React from 'react';
import Search from './Search';
import PlaylistDisplay from './PlaylistDisplay';

// Data for testing purposes
import data from '../data';

/***
 * The App is the main component that holds all of the other components.
 */

function App() {
  return (
    <div className="App">
      <button>
        Connect to Spotify
      </button>
      <Search/>
      <PlaylistDisplay playlists={data}/>
    </div>
  );
}

export default App;
