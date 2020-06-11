const mongoose = require('mongoose')

const playlistSchema = new mongoose.Schema({
    _id: {
        type: ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    songs: {
        type: Array,
        required: true,
        track: [{
            name: {
                type: String,
                required: true
            },
            artists: [{
                artist: String
            }],
            id: {
                type: String,
                required: true
            }
        }]
    },
    author: {
        type: String,
        required: false
    }
})


module.exports = mongoose.model('Playlist', playlistSchema)
