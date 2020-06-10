import React, { useState, useEffect } from "react";
// import { Button } from 'react-bootstrap';
import Search from "./Search";
import SpotifyWebApi from "spotify-web-api-js";
import PlaylistPage from './PlaylistPage'


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
    artists: [],
  });

  const [searchQueryState, setSearchQueryState] = useState({
    searchQuery: "",
  });
  const { searchQuery } = searchQueryState;

  const [playlistState, setPlaylistState] = useState({
    songs:[],
  })

  // Updates searchQueryState state on target value change
  const onSearchChange = (e) => {
    setSearchQueryState({ searchQuery: e.target.value });
  };

  // Updates suggestedSongs state
  //   const setSuggestions = (trackArray, artistArray) => {
  //     setSongsState({ suggestedSongs: trackArray, artists: artistArray });
  //   };

  // adds the song to playlistState
  const addSong = (id) => {
    // e.preventDefault();
    const currentSong= songsState.suggestedSongs.find((song,index) => index===id);
    setPlaylistState({songs:[...playlistState.songs,currentSong]})
    console.log(playlistState.songs);
  };

  useEffect(() => {
    (async function(searchQueryState) {
      if (getHashParams().access_token) {
        spotifyApi.setAccessToken(getHashParams().access_token);
      }
      try {
        if (searchQuery) {
          const res = await spotifyApi.search(searchQuery, ["track"]);
          const songs = res.tracks.items.map((item) => item.name);
          const artistsArray = res.tracks.items.map((item) => item.artists);
          const artists = artistsArray.map((artist) => artist[0].name);
          // console.log(artists)
          // *****console.log(songs);
          // setSuggestions(songs);
          setSongsState({ suggestedSongs: songs, artists: artists });
        }
      } catch (error) {
        console.log(error.message);
        setSongsState({ suggestedSongs: undefined, artists: undefined });
      }
    })();
  }, [searchQuery, searchQueryState]);

  const AutoSearchList = () => (
    <ul className="list-group">
      {songsState.suggestedSongs.map((song,index) => (
        <li className="list-group-item" key={index}>{song} – {songsState.artists[index]}
          <button type="submit" style={{float:"right", marginLeft:17}} onClick={() => addSong(index)}>Add song</button>
        </li>
      ))}
    </ul>
  );



  return (
    <div className="search-box">
      <Search
        value={searchQuery}
        onSearchChange={onSearchChange}
        placeholder="Search a song..."
        name="searchQuery"
      />
      {songsState.suggestedSongs ? (
          <AutoSearchList />
      ) : (
        <div>No results</div>
      )}
      {playlistState.songs ? (
        <div>
        <PlaylistPage list={playlistState.songs}/>
        </div>
      ) : (
        <div>Add songs to this playlist.</div>
      )}
    </div>
  );
};

export default AutoSearch;
