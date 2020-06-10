import React, { useState, useEffect } from 'react';
import {
  InputGroup, Row, Col, Container, Button, Card,
} from 'react-bootstrap';
import AutoSearch from './AutoSearch';

const PlaylistForm = (props) => {
  const [playlist, setPlaylist] = useState(null);

  const { playlistName } = props;

  // When the form loads, get the playlist from the URL.
  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(`/playlists/${playlistName}`);
        setPlaylist(await response.json());
      } catch (error) {
        console.error(error);
      }
    }());
  }, [playlistName]);

  const savePlaylist = () => {
    // TODO: Makes a POST request to the database to save the playlist or PUT if it exists already.
    console.log('not saved!');
  };

  const savePlaylistOnSpotify = () => {
    // TODO: Saves the playlist to a user's spotify account if they're logged in.
    console.log('test');
  };

  // const searchSong = (e) => {
  //      // Searches for a song from Spotify's API based on the current input.
  // }

  // const addSong = () => {
  //   // TODO: Adds song to the playlist.
  // };

  const displayForm = () => (
    <Container fluid>
      <Row>
        <Col>
          <InputGroup>
            <AutoSearch />
          </InputGroup>
          <Button onClick={() => savePlaylistOnSpotify()}>Save playlist on Spotify</Button>
        </Col>
        {/* {playlist.tracks.map((track, index) => { return (
                   <Card key={track.id}>
                       <Card.Body>
                           <h3>
                               {track.name}
                           </h3>
                           <h4>
                               {track.artists.map((artist, index) => {
                                   return (`${artist}`)
                               })}
                           </h4>
                       </Card.Body>
                       <Button>X</Button>
                   </Card>
               )
               })} */}
        <Col>
          <h2>{playlist.title}</h2>
          {playlist.songs.map((song) => (
            <Card key={song[0] + song[1]}>
              <Card.Body>
                <Card.Title>{song[0]}</Card.Title>
                <Card.Text>{song[1]}</Card.Text>
              </Card.Body>
              <Button variant="danger">X</Button>
            </Card>
          ))}
          <Button onClick={() => savePlaylist()}>Save Playlist</Button>
        </Col>
      </Row>
    </Container>
  );

  return (
    <div>
      {playlist !== null ? displayForm()
        : <h4>No playlist...</h4>}
    </div>
  );
};

export default PlaylistForm;
