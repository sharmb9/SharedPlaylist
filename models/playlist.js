const mongoose = require('mongoose')
const Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
const playlistSchema = new mongoose.Schema({
    _id: String,
    title: {
        type: String,
        required: true
    },
    songs: {
        type: Array,
        required: true,
        // track: [{
        //     name: {
        //         type: String,
        //         required: true
        //     },
        //     artists: [{
        //         artist: String
        //     }],
        //     id: {
        //         type: String,
        //         required: true
        //     }
        // }]
    },
    author: {
        type: String,
        required: false
    }
})
playlistSchema.virtual('categoryId').get(function() {
    return this._id;
});

module.exports = mongoose.model('Playlist', playlistSchema)
