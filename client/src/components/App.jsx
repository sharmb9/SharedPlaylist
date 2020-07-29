import React, { useState, useEffect, useRef } from 'react';
// noinspection ES6CheckImport
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
  Modal, Button, FormControl, Form, InputGroup,
} from 'react-bootstrap';
import Search from './Search';
import PlaylistDisplay from './PlaylistDisplay';
import PlaylistForm from './PlaylistForm';

async function createList(title) {
  if (title.current.value !== '') {
    try {
      const response = await fetch(`http://${window.location.host}/playlists/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: title.current.value, author: 'Hard Coded' }),
      });
      console.log(await response.json().message);
      window.location.href = `/playlist/${title.current.value}${window.location.hash}`;
    } catch (error) {
      console.error(error);
    }
  }
}


/** *
 * The App is the main component that holds all of the other components.
 */

const App = () => {
  const [playlists, setPlaylists] = useState([]);
  const [shownlists, showLists] = useState(playlists);
  const [modal, toggle] = useState(false);
  const title = useRef();

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
      <Button className="btn" id="connect-btn" href={`http://${window.location.hostname}:8080/connect/${window.location.hash}`}>
        {window.location.hash.includes('access_token=') ? document.cookie.split('_name=').pop().split(';')[0] : 'Connect to Spotify'}
      </Button>
      <Router>
        <Route exact path="/">
          <Button variant="secondary" id="add-playlist" onClick={() => toggle(true)}>+</Button>
          <Search show={showLists} lists={playlists} placeholder="Search a playlist..." />
          <Modal centered show={modal} onHide={() => toggle(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Create a New Playlist</Modal.Title>
            </Modal.Header>
            <Form>
              <Form.Group>
                <Modal.Body>
                  <InputGroup>
                    <FormControl required type="text" ref={title} placeholder="Enter a title..." />
                  </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                  <Button type="submit" onClick={() => createList(title)}>Create</Button>
                </Modal.Footer>
              </Form.Group>
            </Form>
          </Modal>
          <PlaylistDisplay playlists={shownlists} />
        </Route>
        <Route
          path="/playlist/:playlistName"
          render={({ match }) => (<PlaylistForm playlistName={match.params.playlistName} />)}
        />
      </Router>
    </div>
  );
};

export default App;
