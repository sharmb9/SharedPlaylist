import React from 'react';
import Search from './Search';
import PlaylistDisplay from './PlaylistDisplay';
import PlaylistForm from './PlaylistForm';

// Data for testing purposes
import data from '../data';

/***
 * The App is the main component that holds all of the other components.
 */

//  TODO: GET data from MongoDB instead of the test data from data.js.

function App() {
  return (
    <div className="App">
      <button>
        Connect to Spotify
      </button>
      <Search/>
      <PlaylistDisplay playlists={data}/>
      <PlaylistForm playlist={data[0]}/>
    </div>
  );
}

export default App;
