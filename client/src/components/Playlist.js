import React from 'react';

/***
 * The playlist component is a card that shows the user data about a playlist.
 * @props playlist - a playlist object
 */

const Playlist = (props) => {
    return (
        <div>
            <h4>{props.playlist.title}</h4>
        </div>
    )
};

export default Playlist