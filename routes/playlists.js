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
        const { display_name } = req.cookies;
        const playlist = new Playlist({
            title: req.body.title,
            author: display_name ? display_name : 'Anonymous Arcturian'
        })
        const newPlaylist = await playlist.save()
        res.status(201).json(newPlaylist)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// router.put("/:song", async (req, res) => {
//     try {
//         const updatedSong = await Playlist.updateOne({ song: req.params.song }, { $set: { song: req.body.song } })
//         res.json({ message: 'Song Updated' })
//     } catch (err) {
//         res.status(500).json({ message: err.message })
//     }
// })

router.post("/:playlistName", async (req, res) => {
    try {
        // TODO: switch to findByIdAndUpdate()
        await Playlist.updateOne({ title: req.params.playlistName }, { $set: { songs: req.body.songs } })
        res.json({ message: 'Playlist Updated' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get("/:playlistName/:song", async (req, res) => {
    try {
        const song = await Playlist.findOne({ song: req.params.song })
        res.json(song)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.delete("/:id/", async (req, res) => {
    try {
        let playlist = await Playlist.findOne({ _id: req.params.id })
        // noinspection JSUnresolvedVariable
        if(req.cookies.display_name !== playlist.author && playlist.author !== 'Anonymous Arcturian') {
            return res.status(401).json({message: 'Only the listed author can delete this playlist.'})
        }
        playlist = await Playlist.deleteOne({ _id: req.params.id })
        res.json({message: "Playlist deleted", playlist});
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get("/:playlistName", async (req, res) => {
    try {
        const playlist = await Playlist.findOne({ title: req.params.playlistName })
        res.json(playlist);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router
