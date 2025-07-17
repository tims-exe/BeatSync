const express = require('express');
const spotifyWebApi = require('spotify-web-api-node');
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config();

const app = express();
app.use(cors())
app.use(bodyParser.json())

app.post('/login', (req, res) => {
    const code = req.body.code
    const spotifyApi = new spotifyWebApi({
        redirectUri: process.env.SPOTIFY_REDIRECT_URL,
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET
    })

    spotifyApi
        .authorizationCodeGrant(code)
        .then(data=> {
            res.status(200).json({
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
                expiresIn: data.body.expires_in,
            })
        })
        .catch((error) => {
            console.log(error)
            res.sendStatus(400)
        })
})

app.listen(3001,function(){
    console.log("The server is up and running")
})