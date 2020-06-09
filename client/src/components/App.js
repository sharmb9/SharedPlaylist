import React, {useState, useEffect} from 'react';
import Search from './Search';
import PlaylistDisplay from './PlaylistDisplay';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import PlaylistForm from './PlaylistForm';

/***
 * The App is the main component that holds all of the other components.
 */

const App = () => {

  const [playlists, setPlaylists] = useState([]);

  // When mounting, pull the /playlists objects from the server.
  useEffect(() => {
    (async function() {
      try {
        const response = await fetch('/playlists/');
        setPlaylists(await response.json());
      }
      catch(error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="App">
      <a href="http://localhost:8888">
          <button>Connect To Spotify</button>
      </a>
      <Router>
        <Route exact={true} path="/">
          <Search placeholder="Search a playlist..."/>
          <PlaylistDisplay playlists={playlists}/>
        </Route>
        <Route path="/playlist/:playlistName" render={({match}) => (
          <PlaylistForm playlistName={match.params.playlistName}/>
        )}>
        </Route>
      </Router>
    </div>
  );
}

export default App;
