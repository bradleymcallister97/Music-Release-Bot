const mongoose = require('mongoose');
const _ = require('lodash');

const ArtistModel = require('../models/artist');
const Artist = mongoose.model('Artist');

function getAllArtitsts() {
    return Artist.find().then((artists) => {
        if (!_.isEmpty(artists)) {
            return artists.map((a) => {
                return {
                    id: a.artist_id,
                    name: a.name
                };
            });
        } else {
            return [];
        }
    });
}

module.exports = {
    getAllArtitsts: getAllArtitsts
};
