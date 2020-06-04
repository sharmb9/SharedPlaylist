const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const playlistRouter = require('./routes/playlists')
const app = express()

app.use(express.json())
app.use('/playlists', playlistRouter)
app.use(bodyParser.urlencoded({ extended: true }))


mongoose.connect('mongodb+srv://arcturus:arcturus123@sharedplaylist-vwicm.mongodb.net/<dbname>?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))




app.listen(8080, () => console.log('server started on port 8080'))
