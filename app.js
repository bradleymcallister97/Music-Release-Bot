const express = require('express');
const bodyParser = require('body-parser');

if (!process.env.FACEBOOK_ACCESS_TOKEN){
    throw new Error('FACEBOOK_ACCESS_TOKEN not defined');
}

const port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', require('./controllers/verification'));
app.post('/', require('./controllers/messageWebhook'));

app.listen(port, () => console.log('Listening on port ' + port));
