import React, { useState, useEffect } from "react";
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
  // const{songs} = playlistState

  // Updates searchQueryState state on target value change
  const onSearchChange = (e) => {
    setSearchQueryState({ searchQuery: e.target.value });
  };

  // Updates suggestedSongs state
  const setSuggestions = (trackArray, artistArray) => {
    setSongsState({ suggestedSongs: trackArray, artists: artistArray });
  };

  // addds the song to playlistState
  const addSong = (id) => {
    // e.preventDefault();
    const currentSong= songsState.suggestedSongs.find((song,index) => index===id);
    setPlaylistState({songs:[...playlistState.songs,currentSong]})
    console.log(playlistState.songs);
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
          const artistsArray = res.tracks.items.map((item) => item.artists);
          const artists = artistsArray.map((artist) => artist[0].name);
          // console.log(artists)
          setSuggestions(songs, artists);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getSearchedTracks(searchQueryState);
  }, [searchQueryState]);

  const AutoSearchList = () => (
    <ul className="list-group">
      {songsState.suggestedSongs.map((song,index) => (
        <li key={index} className="list-group-item">{song}<button onClick={() => addSong(index)}>Add song</button></li>
      ))}
    </ul>
  );

  const PlaylistTable = () => (
    <ul className="list-group">
        {playlistState.songs.map( (item,index) => (<li key ={index} className="list-group-item">{item}</li>))}
        </ul>
  )

  return (
    <div>
      <Search
        value={searchQuery}
        onSearchChange={onSearchChange}
        placeholder="Search a song..."
        name="searchQuery"
      />
      {songsState ? (
        <div>
          <AutoSearchList />
        </div>
      ) : (
        <div></div>
      )}
      {playlistState ? (
        <div>
          <PlaylistTable />
        </div>
      ) : (
        <div></div>
      )}


    </div>
  );
};

export default AutoSearch;
