const express = require('express')
const router = express.Router()
const Playlist = require('../models/playlist')

router.get('/', async (req, res) => {
    try {
        const playlist = await Playlist.find()
        res.json(playlist)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


router.post('/', async (req, res) => {
    try {
        const playlist = new Playlist({
            song: req.body.song,
            artist: req.body.artist
        })
        const newPlaylist = await playlist.save()
        res.status(201).json(newPlaylist)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.delete('/:song', async (req, res) => {
    try {
        const removedSong = await Playlist.deleteOne({ song: req.params.song })
        res.json({ message: 'Song deleted' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.put("/:song", async (req, res) => {
    try {
        const updatedSong = await Playlist.updateOne({ song: req.params.song }, { $set: { song: req.body.song } })
        res.json({ message: 'Song Updated' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


module.exports = router