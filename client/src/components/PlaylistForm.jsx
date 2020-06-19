/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import { InputGroup, Row, Col, Container, Button, Card } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-js";
import AutoSearch from "./AutoSearch";
import { getUserId, getHashParams } from "./util/spotify";

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
    })();
  }, []);

  const savePlaylist = () => {
    (async function () {
      try {
        const response = await fetch(
          `http://${window.location.host}/playlists/${playlist.title}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            // eslint-disable-next-line no-underscore-dangle
            body: JSON.stringify({ songs: playlist.songs }),
          }
        );
        console.log(await response.json());
      } catch (error) {
        console.error(error);
      }
    })();
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
        (spotifyplaylistTitle) => spotifyplaylistTitle === playlistName
      );
      // If playlist name doesnt exist in spotify account, create playlist and get id otherwise use current playlist id
      if (!existingPlaylistName) {
        const res = await spotifyApi.createPlaylist(userId, {
          name: playlistName,
        });
        playlistId = res.id;
        await spotifyApi.addTracksToPlaylist(playlistId, uriArray);
        console.log("Created new playlist");
      } else {
        const playlistIds = spotifyRes.items.map((item) => item.id);
        playlistId = playlistIds[0];
        await spotifyApi.replaceTracksInPlaylist(playlistId, uriArray);
        console.log("New tracks added");
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
      alert("Calm down. Choose a different song.");
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
      <div className="search">
        <InputGroup bsClass="input-group">
          <AutoSearch onAdd={(songs, id) => addSong(songs, id)} />
          <InputGroup.Append>
            <Button bsClass="btn" onClick={savePlaylistOnSpotify}>
              Save playlist on Spotify
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
      {playlist.songs.length ? (
        <div className="playlist-display">
          <h2>{playlist.title}</h2>
          {playlist.songs.map((song) => (
            <Card style={{position:"static"}} key={song[2]}>
              <Card.Body>
                <Card.Title>{song[0]}</Card.Title>
                <Card.Text>{song[1].join(", ")}</Card.Text>
              </Card.Body>
              <Button variant="danger" onClick={() => removeSong(song[2])}>
                X
              </Button>
            </Card>
          ))}
          <Button onClick={() => savePlaylist()}>Save Playlist</Button>
        </div>
      ) : (
        <div className="no-playlist">
          <h1>{playlist.title}</h1>
          <h5>Add songs to this playlist.</h5>
        </div>
      )}
    </div>
  );

  return (
    <div>{playlist !== null ? displayForm() : <h4>No playlist...</h4>}</div>
  );
};

export default PlaylistForm;
