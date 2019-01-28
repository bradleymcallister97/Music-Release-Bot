const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');

require('./helpers/setupDB.js');

if (!config.facebook.token || !config.spotify.token) {
    console.error('Not All Tokens have been initialized');
    throw new Error('Not All Tokens have been initialized');
}

const port = config.port;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', require('./controllers/verification'));
app.post('/', require('./controllers/messageWebhook'));

app.listen(port, () => console.log('Listening on port ' + port));
