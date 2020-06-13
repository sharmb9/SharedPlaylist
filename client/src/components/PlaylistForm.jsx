import React, { useState, useEffect } from 'react';
import {
  InputGroup, Row, Col, Container, Button, Card,
} from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-js';
import AutoSearch from './AutoSearch';
import { getUserId, getHashParams } from './util/spotify';

const spotifyApi = new SpotifyWebApi();

const PlaylistForm = (props) => {
  const [playlist, setPlaylist] = useState(null);

  const { playlistName } = props;

  // When the form loads, get the playlist from the URL.
  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(`/playlists/${playlistName}`);
        setPlaylist(await response.json());
      } catch (error) {
        console.error(error);
      }
    }());
  }, [playlistName]);

  const savePlaylist = () => {
    (async function () {
      try {
        const response = await fetch(
          `http://${window.location.host}/playlists/${playlist.title}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            // eslint-disable-next-line no-underscore-dangle
            body: JSON.stringify({ songs: playlist.songs }),
          },
        );
        console.log(await response.json());
      } catch (error) {
        console.error(error);
      }
    }());
  };

  // Saves the playlist to a user's spotify account if they're logged in.
  const savePlaylistOnSpotify = async () => {
    const userId = await getUserId();
    const params = getHashParams();
    const { access_token } = params;
    const uriArray = playlist.songs.map(((song) => song[3]));
    if (access_token) {
      spotifyApi.setAccessToken(access_token);
    }
    try {
      // create playlist and gets playlist id needed for addings songs to playlist
      const res = await spotifyApi.createPlaylist(userId, { name: playlistName });
      const playlistId = res.id;
      const snapshotid = await spotifyApi.addTracksToPlaylist(playlistId, uriArray);
      console.log(snapshotid);
    } catch (error) {
      console.log(error.response);
    }
  };

  const addSong = (songList, id) => {
    const currentSong = songList.suggestedSongs[id];
    const artists = songList.artists[id];
    const uuid = songList.ids[id];
    const uri = songList.uris[id];
    let { songs } = playlist;
    if (songs.some((x) => x[2] === uuid)) {
      alert('Calm down. Choose a different song.');
      return;
    }
    songs = [...songs, [currentSong, artists, uuid, uri]];
    setPlaylist({
      // eslint-disable-next-line no-underscore-dangle
      title: playlist.title,
      _id: playlist._id,
      author: playlist.author,
      songs,
    });
  };

  const removeSong = (id) => {
    setPlaylist({
      title: playlist.title,
      // eslint-disable-next-line no-underscore-dangle
      _id: playlist._id,
      author: playlist.author,
      songs: playlist.songs.filter((s) => s[2] !== id),
    });
  };

  const displayForm = () => (
    <Container fluid>
      <Row>
        <Col>
          <InputGroup>
            <AutoSearch onAdd={(songs, id) => addSong(songs, id)} />
          </InputGroup>
          <Button onClick={savePlaylistOnSpotify}>
            Save playlist on Spotify
          </Button>
        </Col>
        {playlist.songs.length ? (
          <Col>
            <h2>{playlist.title}</h2>
            {playlist.songs.map((song) => (
              <Card key={song[2]}>
                <Card.Body>
                  <Card.Title>{song[0]}</Card.Title>
                  <Card.Text>{song[1].join(', ')}</Card.Text>
                </Card.Body>
                <Button variant="danger" onClick={() => removeSong(song[2])}>
                  X
                </Button>
              </Card>
            ))}
            <Button onClick={() => savePlaylist()}>Save Playlist</Button>
          </Col>
        ) : (
          <Col>
            <h1>{playlist.title}</h1>
            <h5>Add songs to this playlist.</h5>
          </Col>
        )}
      </Row>
    </Container>
  );

  return (
    <div>{playlist !== null ? displayForm() : <h4>No playlist...</h4>}</div>
  );
};

export default PlaylistForm;
