import React from 'react';
import Playlist from './Playlist';

/***
 * The playlist display is the container for all of the playlist cards.
 * @props playlist - an array of playlist objects
 */

const PlaylistDisplay = (props) => {
    return (
        <div>
            {props.playlists !== [] ? 
                props.playlists.map((playlist, index) => {
                    return (<Playlist key={index} playlist={playlist}/>)
                })
            : <h1>No playlists yet...</h1>}
        </div>
    )
};

export default PlaylistDisplay