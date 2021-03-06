import React from 'react';
import { Button, Card } from 'react-bootstrap';

const deletePlaylistById = async (id) => {
  try {
    const res = await fetch(`/playlists/${id}/`, {
      method: 'DELETE',
    });
    const ponse = await res.json();
    window.location.href = `http://${window.location.host}${window.location.hash}`;
    alert(ponse.message);
  } catch (error) {
    console.error(error);
  }
};

/** *
 * The playlist component is a card that shows the user data about a playlist.
 * @props playlist - a playlist object
 */

const Playlist = (props) => {
  const { playlist } = props;
  return (
    <Card className="playlist-card">
      <Card.Body className="playlist-card m-0">
        {/* eslint-disable-next-line no-underscore-dangle */}
        <Button className="float-right" id="delete" onClick={() => deletePlaylistById(playlist._id)}>✗</Button>
        <h2>{playlist.title || 'Outdated document entry'}</h2>
        <h4>{playlist.author}</h4>
      </Card.Body>
    </Card>
  );
};

export default Playlist;
