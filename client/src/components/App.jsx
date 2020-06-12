import React, { useState, useEffect } from 'react';
// noinspection ES6CheckImport
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Modal, Button, FormControl } from 'react-bootstrap';
import Search from './Search';
import PlaylistDisplay from './PlaylistDisplay';
import PlaylistForm from './PlaylistForm';

/** *
 * The App is the main component that holds all of the other components.
 */

const App = () => {
  const [playlists, setPlaylists] = useState([]);
  const [shownlists, showLists] = useState(playlists);
  const [modal, toggle] = useState(false);

  // When mounting, pull the /playlists objects from the server.
  useEffect(() => {
    (async function () {
      try {
        const response = await fetch('/playlists/');
        const goods = await response.json();
        setPlaylists(goods); showLists(goods);
      } catch (error) {
        console.error(error);
      }
    }());
  }, []);

  return (
    <div className="App">
      <a className="btn btn-dark" href={`http://${window.location.hostname}:8888/${window.location.hash}`}>
        Connect to Spotify
      </a>
      <Router>
        <Route exact path="/">
          <Button variant="secondary" onClick={() => toggle(true)}>+</Button>
          <Search show={showLists} lists={playlists} placeholder="Search a playlist..." />
          <Modal centered show={modal} onHide={() => toggle(false)}>
            <Modal.Header closeButton><Modal.Title>New Playlist</Modal.Title></Modal.Header>
            <Modal.Body><FormControl placeholder="Title" /></Modal.Body>
            <Modal.Footer><Button onClick={() => alert('maybe tomorrow')}>Create</Button></Modal.Footer>
          </Modal>
          <PlaylistDisplay playlists={shownlists} />
        </Route>
        <Route
          path="/playlist/:playlistName"
          render={({ match }) => {
            showLists(playlists);
            return <PlaylistForm playlistName={match.params.playlistName} />;
          }}
        />
      </Router>
    </div>
  );
};

export default App;
