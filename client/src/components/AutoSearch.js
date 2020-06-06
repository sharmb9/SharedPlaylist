import React, { useState, useEffect } from "react";
import Search from "./Search";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

const AutoSearch = () => {
  /**
   * Obtains parameters from the hash of the URL
   * @return Object
   */
  const getHashParams = () => {
    const hashParams = {};
    let e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  };

  const [songsState, setSongsState] = useState({
    suggestedSongs: [],
  });
  // const { suggestedSongs } = songsState;

  const [searchQueryState, setSearchQueryState] = useState({
    searchQuery: "",
  });
  const { searchQuery } = searchQueryState;

  // Updates searchQueryState state on target value change
  const onSearchChange = (e) => {
    setSearchQueryState({ searchQuery: e.target.value });
    // getSearchedTracks(searchQuery);
  };

  // Updates suggestedSongs state
  const setSuggestions = (trackArray) => {
    // const newSongState = {
    //   suggestedSongs: trackArray,
    // };
    setSongsState({ suggestedSongs: trackArray, });
    console.log(songsState.suggestedSongs);
  };

  useEffect(() => {
    const getSearchedTracks = async (searchQueryState) => {
      if (getHashParams().access_token) {
        spotifyApi.setAccessToken(getHashParams().access_token);
      }
      try {
        if (searchQuery) {
          const res = await spotifyApi.search(searchQuery, ["track"]);
          const songs = res.tracks.items.map((item) => item.name);
          // *****console.log(songs);
          setSuggestions(songs);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getSearchedTracks(searchQueryState);
  }, [searchQueryState]);

  const AutoSearchList = () => (
    <ul className="list-group">
      {songsState.suggestedSongs.map((song) => <li>{song}</li>)}
    </ul>
  );

  return (
    <div>
      <Search
        value={searchQuery}
        onSearchChange={onSearchChange}
        placeholder="Search a song..."
        name="searchQuery"
      />
      {songsState ? <AutoSearchList/> : <p>Not valid</p>}
    </div>
  );
};

export default AutoSearch;
