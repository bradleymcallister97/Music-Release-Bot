module.exports = {
    port: process.env.PORT || 3000,
    jokes: {
        url: process.env.JOKES_URL || 'https://icanhazdadjoke.com/'
    },
    facebook: {
        url: process.env.FACEBOOK_URL || 'https://graph.facebook.com/v2.6/me/messages',
        token: process.env.FACEBOOK_ACCESS_TOKEN
    }
}