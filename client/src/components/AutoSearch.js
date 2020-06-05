import React, { useState } from "react";
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
    // setting default search query as string a for now(change to later)
    searchQuery: "a",
    suggestedSongs: null,
  });

  const { searchQuery, suggestedSongs } = songsState;

  const onSearchChange = async (e) => {
    setSongsState({ ...songsState, searchQuery: e.target.value });
    if (getHashParams().access_token) {
        // console.log(getHashParams().access_token)
        spotifyApi.setAccessToken(getHashParams().access_token);
      }
    try {
        const res = await spotifyApi.search(searchQuery,["track"])
        console.log(res.tracks.items.map( (item) => item.name))
      } catch (error) {
          console.log(error.message)
      }
  };

  const getSongs = async () => {

  };

  return (
    <div>
      <Search
        value={searchQuery}
        onSearchChange={onSearchChange}
        placeholder="Search a song..."
        name="searchQuery"
      />
    </div>
  );
};

export default AutoSearch;
