const mongoose = require('mongoose');
const _ = require('lodash');

const Artist = mongoose.model('Artist');

function getAllArtitsts() {
    console.log('get all artists');
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
    console.log('create artist ' + artistId + ' - ' + artistName);
    return Artist.create({
        artist_id: artistId,
        name: artistName
    });
}

module.exports = {
    getAllArtitsts: getAllArtitsts,
    createArtist: createArtist
};
