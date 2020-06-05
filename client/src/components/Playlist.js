import React from 'react';
import {Card} from 'react-bootstrap';
/***
 * The playlist component is a card that shows the user data about a playlist.
 * @props playlist - a playlist object
 */

const Playlist = (props) => {
    return (
        <Card>
            <Card.Body>
                <h2>{props.playlist.name}</h2>
            </Card.Body>
        </Card>
    )
};

export default Playlist