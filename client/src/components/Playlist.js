import React from 'react';
import {Card} from 'react-bootstrap';

/***
 * The playlist component is a card that shows the user data about a playlist.
 * @props playlist - a playlist object
 */

// TODO: Update the playlist display.

const Playlist = (props) => {
    return (
        <Card>
            <Card.Body>
                <h2>{props.playlist.title || "Outdated document entry"}</h2>
                <h4>{props.playlist.author}</h4>
            </Card.Body>
        </Card>
    )
};

export default Playlist
