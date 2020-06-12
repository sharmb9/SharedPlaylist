import React from "react";
import { Link } from "react-router-dom";
import Playlist from "./Playlist";
import {getHashParams} from "./util/spotify";


/**
 * The playlist display is the container for all of the playlist cards.
 * @props playlist - an array of playlist objects
 */

const PlaylistDisplay = (props) => {
  const { playlists } = props;
  const params = getHashParams();
  let access_token = params.access_token;
  return (
    <div>
      {playlists !== [] ? (
        playlists.map((playlist, index) => (
          <Link
            key={index.toString()}
            to={`/playlist/${playlist.title}#access_token=${
              access_token
            }`}
          >
            <Playlist playlist={playlist} />
          </Link>
        ))
      ) : (
        <h1>No playlists yet...</h1>
      )}
    </div>
  );
};

export default PlaylistDisplay;
