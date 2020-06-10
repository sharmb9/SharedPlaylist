import React from 'react';
import { Link } from 'react-router-dom';
import Playlist from './Playlist';
import { getHashParams } from './AutoSearch';

/**
 * The playlist display is the container for all of the playlist cards.
 * @props playlist - an array of playlist objects
 */

const PlaylistDisplay = (props) => {
  const { playlists } = props;
  return (
    <div>
      {playlists !== []
        ? playlists.map((playlist, index) => (
          <Link key={index.toString()} to={`/playlist/${playlist.title}#access_token=${getHashParams().access_token}`}>
            <Playlist playlist={playlist} />
          </Link>
        ))
        : <h1>No playlists yet...</h1>}
    </div>
  );
};

export default PlaylistDisplay;
