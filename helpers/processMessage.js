const rp = require('request-promise');
const getJoke = require('./getJoke');

const FACEBOOK_ACCESS_TOKEN = 'EAAChiopnzS0BANfJ1loC4oUZAcwsrybfIFzMoeYbz67Oq2bQYnSdgxngctrwE0guNVlSr3tZAf0zB4cnC6i3MZBJY13RjPpnIZBkbxTL4mwDQN06vHVRDH6CqS1KmSUdxCSfsoM3Q2ov8DvTiYlkbIIFjfmSAwYmBZBWcR8IUygZDZD';

module.exports = (event) => {
    getJoke().then((joke) => {
        rp({
            uri: 'https://graph.facebook.com/v2.6/me/messages',
            qs: { access_token: FACEBOOK_ACCESS_TOKEN },
            method: 'POST',
            body: {
                recipient: { id: event.sender.id },
                message: { text: joke },
            },
            json: true
        });
    });
}
