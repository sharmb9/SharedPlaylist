const mongoose = require('mongoose')

const playlistSchema = new mongoose.Schema({
    song: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('Playlist', playlistSchema)