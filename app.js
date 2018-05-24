const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');

if (!config.facebook.token){
    throw new Error('FACEBOOK_ACCESS_TOKEN not defined');
}

const port = config.port;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', require('./controllers/verification'));
app.post('/', require('./controllers/messageWebhook'));

app.listen(port, () => console.log('Listening on port ' + port));
