'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Artist = new Schema({
    artist_id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    }
});

mongoose.model('Artist', Artist);
