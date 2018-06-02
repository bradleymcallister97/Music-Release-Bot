const processMessage = require('../helpers/processMessage');
const processPostback = require('../helpers/processPostback');

module.exports = (req, res) => {
    if (req.body.object === 'page') {
        req.body.entry.forEach(entry => {
            entry.messaging.forEach(event => {
                if (event.message && event.message.text) {
                    console.log('Handeling message event');
                    processMessage(event);
                } else if (event.postback){
                    console.log('Handeling postback event');
                    processPostback(event);
                }
            });
        });
        res.status(200).send('EVENT_RECEIVED');
    } else {
        console.log('Unknown request');
        res.sendStatus(404);
    }
};