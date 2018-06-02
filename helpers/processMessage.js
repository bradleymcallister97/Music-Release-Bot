const config = require('../config');
const rp = require('request-promise');
const _ = require('lodash');
const { sendMessageToUser, sendButtonsToUser } = require('../dao/facebook');
const { searchArtists } = require('../dao/spotify');
const { getArtists, getArtist } = require('../dao/user');

module.exports = (event) => {
    const userId = event.sender.id;
    const nlp = _.get(event, 'message.nlp.entities');

    if (nlp.greetings && nlp.greetings[0] && nlp.greetings[0].confidence > 0.8) {
        var message = `Hello, I'm a music reminder bot. I notify you when your favourite artists release a new album. The way that I work is that you tell me an artist and I will give you a list of artists that I can find. Then you will tell me the correct artist, and that's it. Once you have subscribed to an artist, you will get notifications when they release a new album. To subscribe to an artist say "subscribe <artist name>". To unsubscribe to an artist say "unsubscribe <artist name>". To see a list of your artists say "list subscriptions"`
        sendMessageToUser(userId, message);
    } else if (event.message.text.startsWith('subscribe')) {
        const artistQuery = event.message.text.replace('subscribe','').trim();
        return searchArtists(artistQuery).then((artists) => {
            var btns = artists.map((a) => {
                return {
                    name: a.name,
                    payload: {
                        type: 'subscribe',
                        data: {
                            artistId: a.id,
                            artistName: a.name
                        }
                    }
                };
            });
            sendButtonsToUser(userId, 'Select the correct artist', btns);
        }).catch((error) => {
            sendMessageToUser(userId, 'Sorry there was an error finding your artist, please try again');
        });
    } else if (event.message.text.startsWith('unsubscribe')) {
        const artistName = event.message.text.replace('unsubscribe','').trim();
        getArtist(userId, artistName).then((artistId) => {
            if (artistId) {
                var btns = [
                    {
                        name: 'Yes',
                        payload: {
                            type: 'unsubscribe',
                            data: {
                                artistId: artistId,
                                artistName: artistName
                            }
                        }
                    }
                ];
                sendButtonsToUser(userId, 'Are you sure you want to unsubscibe to ' + artistName, btns);
            } else {
                sendMessageToUser(userId, 'You are currently not subscibed to the artist ' + artistName + '. To see a list of your artists say "list subscriptions"');
            }
        }).catch((error) => {
            sendMessageToUser(userId, 'Sorry there was an error attempting to unsubscribed, please try again');
        });
    } else if (event.message.text.startsWith('list subscriptions')) {
        getArtists(userId).then((artists) => {
            if (artists.length === 0) {
                sendMessageToUser(userId, 'You are currently not subscribed to any artists');
            } else {
                sendMessageToUser(userId, 'You are currently subscribed to ' + artists.join(', '));
            }
        }).catch((error) => {
            sendMessageToUser(userId, 'Sorry there was an error getting your subscribed artist, please try again');
        });
    } else {
        sendMessageToUser(userId, `Sorry I cannot understand your message. To subscribe to an artist say "subscribe <artist name>". To unsubscribe to an artist say "unsubscribe <artist name>". To see a list of your artists say "list subscriptions"`);
    }
}
