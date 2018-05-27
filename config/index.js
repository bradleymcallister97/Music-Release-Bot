module.exports = {
    port: process.env.PORT || 3000,
    facebook: {
        url: process.env.FACEBOOK_URL || 'https://graph.facebook.com/v2.6/me/messages',
        token: process.env.FACEBOOK_ACCESS_TOKEN
    },
    spotify: {
        url: 'https://api.spotify.com/v1',
        token: process.env.SPOTIFY_TOKEN
    },
    mongo: {
        connectionStr: process.env.MONGO_CONN_STR || 'mongodb://localhost:27017/mydb'
    }
}