'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var User = new Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    artists: [{
        spotify_id: String,
        name: String
    }]
});

mongoose.model('User', User);
