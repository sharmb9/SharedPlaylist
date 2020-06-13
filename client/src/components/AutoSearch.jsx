import React, { useState, useEffect } from "react";
// import { Button } from 'react-bootstrap';
import {getHashParams} from "./util/spotify";
import SpotifyWebApi from "spotify-web-api-js";
import { FormControl } from "react-bootstrap";


const spotifyApi = new SpotifyWebApi();

const AutoSearch = (props) => {
  const { onAdd } = props;
  const [songsState, setSongsState] = useState({
    suggestedSongs: [],
    artists: [],
    ids: [],
    uris:[]
  });

  const [searchQueryState, setSearchQueryState] = useState({ searchQuery: "" });
  const { searchQuery } = searchQueryState;

  // Updates searchQueryState state on target value change
  const onSearchChange = (e) => {
    setSearchQueryState({ searchQuery: e.target.value });
  };

  useEffect(() => {
    (async function () {
      const params = getHashParams();
      let access_token = params.access_token;
      if (access_token) {
        spotifyApi.setAccessToken(access_token);
      }
      try {
        if (searchQuery) {
          const res = await spotifyApi.search(searchQuery, ["track"]);
          const songs = res.tracks.items.map((item) => item.name);
          const ids = res.tracks.items.map((item) => item.id);
          const artistsArray = res.tracks.items.map((item) => item.artists);
          const artists = artistsArray.map((artist) =>
            artist.map((artis) => artis.name)
          );
          const uris =res.tracks.items.map((item) => item.uri)

          setSongsState({ suggestedSongs: songs, artists, ids, uris });
        }
      } catch (error) {
        console.log(error.message);
        setSongsState({
          suggestedSongs: undefined,
          artists: undefined,
          ids: undefined,
          uris:undefined
        });
      }
    })();
  }, [searchQuery, searchQueryState]);

  const AutoSearchList = () => (
    <ul className="list-group">
      {songsState.suggestedSongs.map((song, index) => (
        <li className="list-group-item" key={songsState.ids[index]}>
          {song}
          {" – "}
          <span style={{ color: "darkslategray" }}>
            {songsState.artists[index].join(" × ")}
          </span>
          <button
            type="submit"
            style={{ float: "right", marginLeft: 17 }}
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
      {songsState.suggestedSongs ? <AutoSearchList /> : <div>No results</div>}
    </div>
  );
};

export default AutoSearch;
