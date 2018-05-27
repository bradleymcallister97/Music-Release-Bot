const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const UserModel = require('./models/user');

if (!config.facebook.token || !config.spotify.token){
    throw new Error('Not All Tokens have been initialized');
}

mongoose.connect(config.mongo.connectionStr);

const port = config.port;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', require('./controllers/verification'));
app.post('/', require('./controllers/messageWebhook'));

app.listen(port, () => console.log('Listening on port ' + port));
