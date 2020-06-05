import React, {useState, useEffect} from 'react';
import Search from './Search';
import PlaylistDisplay from './PlaylistDisplay';
import PlaylistForm from './PlaylistForm';

// Data for testing purposes
import data from '../data';

/***
 * The App is the main component that holds all of the other components.
 */

const App = () => {

  const [playlists, setPlaylists] = useState([]);

  // When mounting, pull the /playlists objects from the server. 
  useEffect(() => {
    const getPlaylists = async () => {
      try {
        const response = await fetch('/playlists/');
        setPlaylists(await response.json());
      }
      catch(error) {
        console.error(error);
      }
    }
  getPlaylists();
  });

  return (
    <div className="App">
      <button>
        Connect to Spotify
      </button>
      <Search/>
      <PlaylistDisplay playlists={playlists}/>
      <PlaylistForm playlist={data[0]}/>
    </div>
  );
}

export default App;
