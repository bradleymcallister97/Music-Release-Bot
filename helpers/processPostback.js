const _ = require('lodash');
const config = require('../config');
const { addArtist, removeArtist } = require('../dao/user');
const { sendMessageToUser, sendButtonsToUser } = require('../dao/facebook');
const { createArtist } = require('../dao/artists');

function subscribeToArtist(userId, payload) {
    const artistId = payload.artistId;
    const artistName = payload.artistName;
    addArtist(userId, artistName, artistId).then((result) => {
        createArtist(artistId, artistName);
        console.log(userId + ' subscribed to artistId: ' + artistId);
        sendMessageToUser(userId, 'You have successfully subscribed to ' + artistName);
    }).catch((error) => {
        console.error('processPostback->subscribeToArtist, Error:' + error.message);
        sendMessageToUser(userId, 'Something went wrong trying, please try again');
    });
}

function unsubscribeToArtist(userId, payload) {
    const artistId = payload.artistId;
    const artistName = payload.artistName;
    removeArtist(userId, artistId).then((response) => {
        console.log(userId + ' unsubscribed to artistId: ' + artistId);
        sendMessageToUser(userId, 'You have successfully unsubscribed to ' + artistName);
    }).catch((error) => {
        console.error('processPostback->unsubscribeToArtist, Error:' + error.message);
        sendMessageToUser(userId, 'Something went wrong trying, please try again');
    });
}

module.exports = (event) => {
    const userId = event.sender.id;    
    const postback = event.postback;
    console.log('User ' + userId + ' postback');
    var payload = {};

    try {
        payload = JSON.parse(postback.payload);
    } catch(e) {}

    if (_.isEmpty(payload)) {
        return;
    }

    switch(payload.type) {
        case 'subscribe':
            subscribeToArtist(userId, payload.data);
            break;
        case 'unsubscribe':
            unsubscribeToArtist(userId, payload.data);
            break;
        default:
            return;
    }
}
