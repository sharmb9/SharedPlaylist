import React from 'react';
import { Card } from 'react-bootstrap';

/** *
 * The playlist component is a card that shows the user data about a playlist.
 * @props playlist - a playlist object
 */

const Playlist = (props) => {
  const { playlist } = props;
  return (
    <Card>
      <Card.Body>
        <h2>{playlist.title || 'Outdated document entry'}</h2>
        <h4>{playlist.author}</h4>
      </Card.Body>
    </Card>
  );
};

export default Playlist;
