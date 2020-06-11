import React, { useState, useEffect } from 'react';
// import { Button } from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-js';
import { FormControl } from 'react-bootstrap';

/**
   * Obtains parameters from the hash of the URL
   * @return Object
   */
export const getHashParams = () => {
  const hashParams = {};
  const r = /([^&;=]+)=?([^&;]*)/g;
  const q = window.location.hash.substring(1);
  const e = r.exec(q);
  if (e) hashParams[e[1]] = decodeURIComponent(e[2]);
  return hashParams;
};

const spotifyApi = new SpotifyWebApi();

const AutoSearch = (props) => {
  const { onAdd } = props;
  const [songsState, setSongsState] = useState({
    suggestedSongs: [], artists: [], ids: [],
  });

  const [searchQueryState, setSearchQueryState] = useState({ searchQuery: '' });
  const { searchQuery } = searchQueryState;

  // Updates searchQueryState state on target value change
  const onSearchChange = (e) => {
    setSearchQueryState({ searchQuery: e.target.value });
  };

  useEffect(() => {
    (async function () {
      if (getHashParams().access_token) {
        spotifyApi.setAccessToken(getHashParams().access_token);
      }
      try {
        if (searchQuery) {
          const res = await spotifyApi.search(searchQuery, ['track']);
          const songs = res.tracks.items.map((item) => item.name);
          const ids = res.tracks.items.map((item) => item.id);
          const artistsArray = res.tracks.items.map((item) => item.artists);
          const artists = artistsArray.map((artist) => artist.map((artis) => artis.name));

          setSongsState({ suggestedSongs: songs, artists, ids });
        }
      } catch (error) {
        console.log(error.message);
        setSongsState({ suggestedSongs: undefined, artists: undefined, ids: undefined });
      }
    }());
  }, [searchQuery, searchQueryState]);

  const AutoSearchList = () => (
    <ul className="list-group">
      {songsState.suggestedSongs.map((song, index) => (
        <li className="list-group-item" key={songsState.ids[index]}>
          {song}
          {' – '}
          <span style={{ color: 'darkslategray' }}>{songsState.artists[index].join(' × ')}</span>
          <button type="submit" style={{ float: 'right', marginLeft: 17 }} onClick={() => onAdd(songsState, index)}>Add song</button>
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
      {songsState.suggestedSongs ? (
        <AutoSearchList />
      ) : (
        <div>No results</div>
      )}
    </div>
  );
};

export default AutoSearch;
