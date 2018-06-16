const spotifyToken = Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64');

module.exports = {
    port: process.env.PORT || 3000,
    facebook: {
        url: process.env.FACEBOOK_URL || 'https://graph.facebook.com/v2.6/me/messages',
        token: process.env.FACEBOOK_ACCESS_TOKEN
    },
    spotify: {
        url: 'https://api.spotify.com/v1',
        tokenUrl: 'https://accounts.spotify.com/api/token',
        token: spotifyToken,
        refreshToken: process.env.SPOTIFY_REFRESH_TOKEN
    },
    mongo: {
        connectionStr: process.env.MONGO_CONN_STR || 'mongodb://localhost:27017/mydb'
    }
}