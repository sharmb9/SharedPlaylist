import React from 'react';
import {InputGroup, FormControl, Button, Card} from 'react-bootstrap';

const PlaylistForm = (props) => {
    const {playlist} = props;
    
    const savePlaylist = () => {
        // TODO: Makes a POST request to the database to save the playlist or PUT if it exists already.
    }

    const savePlaylistOnSpotify = () => {
        // TODO: Saves the playlist to a user's spotify account if they're logged in.
    }

   const searchSong = (e) => {
        // TODO: Searches for a song from Spotify's API based on the current input.
   } 

   const addSong = () => {
        // TODO: Adds song to the playlist.
   }

    return (
        <div>
            <h1>{playlist.name}</h1>
            <div>
               <InputGroup>
                    <FormControl 
                        placeholder="Add a song..."
                    />
                    <Button type="submit">
                       Add 
                    </Button>
               </InputGroup>
               <Button>Save playlist on Spotify</Button>
               {props.playlist.tracks.map((track, index) => { return (
                   <Card key={track.id}>
                       <Card.Body>
                           <h3>
                               {track.name}
                           </h3>
                           <h4>
                               {track.artists.map((artist, index) => {
                                   return (`${artist} `)
                               })}
                           </h4>
                       </Card.Body>
                       <Button>X</Button>
                   </Card>
               )
               })}
            </div>
            <Button>Save Playlist</Button>
        </div>
    )
};

export default PlaylistForm