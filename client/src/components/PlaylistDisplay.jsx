import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button, Container, Row, Col,
} from 'react-bootstrap';
import Playlist from './Playlist';
import { getHashParams } from './AutoSearch';

/**
 * The playlist display is the container for all of the playlist cards.
 * @props playlist - an array of playlist objects
 */

const PlaylistDisplay = (props) => {
  const { playlists } = props;

  const deletePlaylist = async (title) => {
    try {
      await fetch(`/playlists/${title}/`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {playlists !== []
        ? playlists.map((playlist, index) => (
          <Container fluid>
            <Row>
              <Col xs={11}>
                <Link key={index.toString()} to={`/playlist/${playlist.title}#access_token=${getHashParams().access_token}`}>
                  <Playlist playlist={playlist} />
                </Link>
              </Col>
              <Col>
                <Button variant="danger" onClick={() => deletePlaylist(playlist.title)}>X</Button>
              </Col>
            </Row>
          </Container>
        ))
        : <h1>No playlists yet...</h1>}
    </div>
  );
};

export default PlaylistDisplay;
