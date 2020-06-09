import React from 'react';
import Playlist from './Playlist';
import {Link} from 'react-router-dom';

/***
 * The playlist display is the container for all of the playlist cards.
 * @props playlist - an array of playlist objects
 */

const PlaylistDisplay = (props) => {
    const getHashParams = () => {
      const hashParams = {};
      let e,
        r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
      while ((e = r.exec(q))) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
      }
      return hashParams;
    };
    return (
        <div>
            {props.playlists !== [] ?
                props.playlists.map((playlist, index) => {
                    return (
                    <Link key={index} to={`/playlist/${playlist.song}#access_token=${getHashParams().access_token}`}>
                        <Playlist playlist={playlist}/>
                    </Link>
                    )
                })
            : <h1>No playlists yet...</h1>}
        </div>
    )
};

export default PlaylistDisplay
