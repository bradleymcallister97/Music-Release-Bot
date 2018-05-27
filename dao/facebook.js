const config = require('../config');
const rp = require('request-promise');

function sendMessageToUser(userId, message) {
    rp({
        uri: config.facebook.url,
        qs: { access_token: config.facebook.token },
        method: 'POST',
        body: {
            recipient: { id: userId },
            message: { text: message },
        },
        json: true
    });
}

function sendButtonsToUser(userId, message, btns) {
    var buttons = btns.map((btn) => {
        return {
            title: btn.name,
            type: 'postback',
            payload: JSON.stringify(btn.payload)
        };
    });
    rp({
        uri: config.facebook.url,
        qs: { access_token: config.facebook.token },
        method: 'POST',
        body: {
            recipient: { id: userId },
            message: {
                attachment: {
                    type: 'template',
                    payload: {
                        template_type: 'button',
                        text: message,
                        buttons: buttons
                    }
                }
            }
        },
        json: true
    });
}

module.exports = {
    sendMessageToUser: sendMessageToUser,
    sendButtonsToUser: sendButtonsToUser
};
