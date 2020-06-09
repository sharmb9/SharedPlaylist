import React, { useState, useEffect } from 'react';
import {InputGroup, FormControl, Button, Card} from 'react-bootstrap';
import AutoSearch from "./AutoSearch";

const PlaylistForm = (props) => {

    const [playlist, setPlaylist] = useState(null);

    // const {playlist} = props;

    // When the form loads, get the playlist from the URL.
    useEffect(() => {
        const getPlaylist = async () => {
            try {
                const response = await fetch(`/playlists/${props.playlistName}`);
                setPlaylist(await response.json());
            }
            catch(error) {
                console.error(error);
            }
        }
        getPlaylist();
    }, [props.playlistName]);

    const savePlaylist = () => {
        // TODO: Makes a POST request to the database to save the playlist or PUT if it exists already.
    }

    const savePlaylistOnSpotify = () => {
        // TODO: Saves the playlist to a user's spotify account if they're logged in.
      console.log("test");
    }

   // const searchSong = (e) => {
   //      // Searches for a song from Spotify's API based on the current input.
   // }

   const addSong = () => {
        // TODO: Adds song to the playlist.
   }

   const displayForm = () => (
        <div>
            <h1>{playlist.name}</h1>
            <div>
               <InputGroup>
                    {/*<FormControl*/}
                    {/*    placeholder="Add a song..."*/}
                    {/*/>*/}
                    <AutoSearch/>
                    {/*<Button type="submit">*/}
                    {/*   Add*/}
                    {/*</Button>*/}
               </InputGroup>
               <Button onClick={() => savePlaylistOnSpotify()}>Save playlist on Spotify</Button>
               {/* {playlist.tracks.map((track, index) => { return (
                   <Card key={track.id}>
                       <Card.Body>
                           <h3>
                               {track.name}
                           </h3>
                           <h4>
                               {track.artists.map((artist, index) => {
                                   return (`${artist}`)
                               })}
                           </h4>
                       </Card.Body>
                       <Button>X</Button>
                   </Card>
               )
               })} */}
               {/* */}
               <Card>
                   <h4>{playlist.song}</h4>
                   <h4>{playlist.artist}</h4>
               </Card>
               {/* */}
            </div>
            <Button>Save Playlist</Button>
        </div>
   );

    return (
        <div>
           {playlist !== null ? displayForm() :
            <h4>No playlist...</h4>
           }
        </div>
    )
};

export default PlaylistForm
