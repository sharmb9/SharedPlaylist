import React from 'react';
import Playlist from './Playlist';

/***
 * The playlist display is the container for all of the playlist cards.
 * @props playlist - a list of playlist objects
 */

const PlaylistDisplay = (props) => {
    return (
        <div>
            {props.playlists.map((playlist, index) => {
                return (<Playlist key={playlist.id} playlist={playlist}/>)
            })}
        </div>
    )
};

export default PlaylistDisplay