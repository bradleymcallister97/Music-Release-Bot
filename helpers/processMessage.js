const rp = require('request-promise');
const _ = require('lodash');

function getGreeting() {
    const messages = ['Hello', 'Howdy', 'Good Day', 'Hey', 'Sup', 'Yo'];
    const i = Math.floor(Math.random() * messages.length);
    return messages[i];
}

function getJoke() {
    return rp({
        method: 'GET',
        uri: 'https://icanhazdadjoke.com/',
        json: true
    }).then((data) => {
        return data.joke;
    }).catch((error) => {
        return 'Sorry could not get a joke, try again';
    });
}

function sendMessageToUser(userId, message) {
    rp({
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: process.env.FACEBOOK_ACCESS_TOKEN },
        method: 'POST',
        body: {
            recipient: { id: userId },
            message: { text: message },
        },
        json: true
    });
}

module.exports = (event) => {
    const userId = event.sender.id;
    const nlp = _.get(event, 'message.nlp.entities');

    new Promise((resolve, reject) => {
        if (nlp.greetings && nlp.greetings[0] && nlp.greetings[0].confidence > 0.8){
            resolve(getGreeting());
        } else if (nlp.joke) {
            resolve(getJoke());
        } else {
            resolve('Sorry I do not understand. You can try again with a different wording, or I might not have the feature that you are trying to use.');
        }
    }).then((message) => {
        sendMessageToUser(userId, message);
    });
}
