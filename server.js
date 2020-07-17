const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const playlistRouter = require('./routes/playlists')
const spotifyAuth = require('./auth/authorization_code/app')
const app = express()
const path = require('path')
const { env } = require('process')

app.use(express.json())
app.use(cors());
// noinspection JSCheckFunctionSignatures
app.use(cookieParser());
app.use('/playlists', playlistRouter)
app.use('/connect', spotifyAuth)
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect('mongodb+srv://arcturus:arcturus123@sharedplaylist-vwicm.mongodb.net/<dbname>?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

//Serve static assets in server
if (process.env.NODE_ENV=='production'){
    //Set static folder
    app.use(express.use('client/build'))
    app.get("*", (req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`server started on port ${PORT}`))
