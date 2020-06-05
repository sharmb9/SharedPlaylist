import React from 'react';
import Search from './Search';
import AutoSearch from './AutoSearch'
import PlaylistDisplay from './PlaylistDisplay';

// Data for testing purposes
import data from '../data';

/***
 * The App is the main component that holds all of the other components.
 */

function App() {
  return (
    <div className="App">
    <a href="http://localhost:8888">
        <button>Connect To Spotify</button>
      </a>
      <Search placeholder="Search a playlist..."/>
      <AutoSearch/>
      <PlaylistDisplay playlists={data}/>
    </div>
  );
}

export default App;
