/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
// import { Button } from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-js';
import { FormControl } from 'react-bootstrap';
import { getHashParams } from './util/spotify';


const spotifyApi = new SpotifyWebApi();

const AutoSearch = (props) => {
  const { onAdd } = props;
  const [songsState, setSongsState] = useState({
    suggestedSongs: [],
    artists: [],
    ids: [],
    uris: [],
  });

  const [searchQueryState, setSearchQueryState] = useState({ searchQuery: '' });
  const { searchQuery } = searchQueryState;

  // Updates searchQueryState state on target value change
  const onSearchChange = (e) => {
    setSearchQueryState({ searchQuery: e.target.value });
  };

  useEffect(() => {
    (async function () {
      const params = getHashParams();
      const { access_token } = params;
      if (access_token) {
        spotifyApi.setAccessToken(access_token);
      }
      try {
        if (searchQuery) {
          const res = await spotifyApi.search(searchQuery, ['track'], {limit:7});
          const songs = res.tracks.items.map((item) => item.name);
          const ids = res.tracks.items.map((item) => item.id);
          const artistsArray = res.tracks.items.map((item) => item.artists);
          const artists = artistsArray.map((artist) => artist.map((artis) => artis.name));
          const uris = res.tracks.items.map((item) => item.uri);

          setSongsState({
            suggestedSongs: songs, artists, ids, uris,
          });
        }
      } catch (error) {
        console.log(error.message);
        setSongsState({
          suggestedSongs: undefined,
          artists: undefined,
          ids: undefined,
          uris: undefined,
        });
      }
    }());
  }, [searchQuery]);

  const AutoSearchList = () => (
    <ul className="autosearch-list-group">
      {songsState.suggestedSongs.map((song, index) => (
        <li className="list-group-item" id="list-group-item-override" key={songsState.ids[index]}>
          <div className="song-item">
          {`${song}-${songsState.artists[index].join(',')}`}
          </div>
          <button
            type="submit"
            className="addsong-button"
            onClick={() => onAdd(songsState, index)}
          >
            Add song
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="search-box">
      <FormControl
        type="text"
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search a song..."
        name="searchQuery"
      />
      {songsState.suggestedSongs && searchQuery ? <AutoSearchList /> : <div></div>}
    </div>
  );
};

export default AutoSearch;
