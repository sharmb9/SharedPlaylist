import React from 'react';
import Playlist from './Playlist';
import {Link} from 'react-router-dom';

/***
 * The playlist display is the container for all of the playlist cards.
 * @props playlist - an array of playlist objects
 */

const PlaylistDisplay = (props) => {
    return (
        <div>
            {props.playlists !== [] ? 
                props.playlists.map((playlist, index) => {
                    return (
                    <Link to={`/playlist/${playlist.song}`}>
                        <Playlist key={index} playlist={playlist}>
                        </Playlist>
                    </Link>
                    )
                })
            : <h1>No playlists yet...</h1>}
        </div>
    )
};

export default PlaylistDisplay