const mongoose = require('mongoose')

const playlistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    songs: {
        type: Array,
        required: true,
    },
    author: {
        type: String,
        required: false
    },
    spotifyid:{
        type:String,
        required:false
    }
})

module.exports = mongoose.model('Playlist', playlistSchema)
