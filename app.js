const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cron = require('node-cron');
const config = require('./config');

if (!config.facebook.token || !config.spotify.token) {
    throw new Error('Not All Tokens have been initialized');
}

mongoose.connect(config.mongo.connectionStr).catch((error) => {
    throw new Error('Error connecting to mongo');
});

const port = config.port;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', require('./controllers/verification'));
app.post('/', require('./controllers/messageWebhook'));

app.listen(port, () => console.log('Listening on port ' + port));

const job = require('./helpers/checkNewAlbums');
cron.schedule('0 9 * * *', () => {
    job();
});
