const express = require('express');
const spotifyWebApi = require('spotify-web-api-node');
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express();
app.use(cors())
app.use(bodyParser.json())

app.post('/login', (req, res) => {
    const code = req.body.code
    const spotifyApi = new spotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: 'a8d740f0b9d44275948b29635c04f387',
        clientSecret: 'a52a6316343c4f03856e4e1c774a14b0'
    })

    spotifyApi
        .authorizationCodeGrant(code)
        .then(data=> {
            res.json({
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
                expiresIn: data.body.expires_in,
            })
        })
        .catch(() => {
            res.sendStatus(400)
        })
})

app.listen(3001)