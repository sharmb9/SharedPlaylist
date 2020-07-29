/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { InputGroup, Button, Card } from 'react-bootstrap';
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
    // eslint-disable-next-line
  }, []);

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
    let playlistId;
    const uriArray = playlist.songs.map((song) => song[3]);
    if (access_token) {
      spotifyApi.setAccessToken(access_token);
    }
    try {
      const spotifyRes = await spotifyApi.getUserPlaylists(userId);
      const playlistNames = spotifyRes.items.map((item) => item.name);
      const existingPlaylistName = playlistNames.find(
        (spotifyplaylistTitle) => spotifyplaylistTitle === playlistName,
      );
      // If playlist name doesnt exist in spotify account, create playlist and get id otherwise use current playlist id
      if (!existingPlaylistName) {
        const res = await spotifyApi.createPlaylist(userId, {
          name: playlistName,
        });
        playlistId = res.id;
        await spotifyApi.addTracksToPlaylist(playlistId, uriArray);
        console.log('Created new playlist');
      } else {
        const playlistIds = spotifyRes.items.map((item) => item.id);
        playlistId = playlistIds[0];
        await spotifyApi.replaceTracksInPlaylist(playlistId, uriArray);
        console.log('New tracks added');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const addSong = (songList, id) => {
    const currentSong = songList.suggestedSongs[id];
    const artists = songList.artists[id];
    const uuid = songList.ids[id];
    const uri = songList.uris[id];
    let { songs } = playlist;
    if (songs.some((x) => x[2] === uuid)) {
      // eslint-disable-next-line no-alert
      alert('Calm down. Choose a different song.');
      return;
    }
    songs = [...songs, [currentSong, artists, uuid, uri]];
    setPlaylist({
      title: playlist.title,
      // eslint-disable-next-line no-underscore-dangle
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
    <div className="playlist-component">
      {playlist.songs.length ? (
        <div className="playlist-display">
          <div className="playlist-tracks">
            <div className="search">
              <InputGroup className="input-group">
                <AutoSearch onAdd={(songs, id) => addSong(songs, id)} />
              </InputGroup>
            </div>
            {playlist.songs.map((song) => (
              <Card
                className="song-card"
                style={{ position: 'static', background: '#576490' }}
                key={song[2]}
              >
                <Card.Body style={{ display: 'flex', padding: '10px' }}>
                  <div className="song-item">
                    <Card.Title>{song[0]}</Card.Title>
                    <Card.Text style={{ color: '#a3bcf9 ' }}>{song[1].join(', ')}</Card.Text>
                  </div>
                  <Button
                    className="remove-button"
                    onClick={() => removeSong(song[2])}
                  >
                    X
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
          <div className="playlist-options">
            <Card className="options-card" style={{ position: 'sticky', background: '#576490' }}>
              <Card.Body className="options-card-body">
                <Card.Title>
                  <h2 style={{ color: 'white' }}>{playlist.title}</h2>
                </Card.Title>
                <Button className="options-button" onClick={() => savePlaylist()}>Save Playlist</Button>
                <Button className="options-button" id="spotify-button" onClick={savePlaylistOnSpotify}>
                  Save playlist on Spotify
                </Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      ) : (
        <div className="no-playlist">
          <h1>{playlist.title}</h1>
          <h5>Add songs to this playlist.</h5>
          <AutoSearch onAdd={(songs, id) => addSong(songs, id)} />
        </div>
      )}
    </div>
  );

  return (
    <div>{playlist !== null ? displayForm() : <h4>No playlist...</h4>}</div>
  );
};

export default PlaylistForm;
