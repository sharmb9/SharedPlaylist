import React, {useState, useEffect} from 'react';
import Search from './Search';
import AutoSearch from './AutoSearch'
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
