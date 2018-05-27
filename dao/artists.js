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

function createArtist(artistId, artistName) {
    return Artist.create({
        artist_id: artistId,
        name: artistName
    });
}

module.exports = {
    getAllArtitsts: getAllArtitsts,
    createArtist: createArtist
};