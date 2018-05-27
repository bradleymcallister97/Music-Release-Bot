const mongoose = require('mongoose');
const _ = require('lodash');

const UserModel = require('../models/user');
const User = mongoose.model('User');

function addArtist(userId, artistName, artistId) {
    return User.findOne({ user_id: userId }).then((user) => {
        if (user) {
            return User.update(
                { user_id: userId },
                { $push: { artists: { spotify_id: artistId, name: artistName } } }
            );
        } else {
            return User.create({
                user_id: userId,
                artists: [{ spotify_id: artistId, name: artistName }]
            });
        }
    });
}

function removeArtist(userId, artistId) {
    return User.update(
        { user_id: userId },
        { $pull: { artists: { spotify_id: artistId } } }
    );
}

function getUsersSubscribedToArtist(artistId) {
    return User.find({ artists: {  $elemMatch: { spotify_id: artistId } } }).then((users) => {
        return users.map((u) => u.user_id);
    });
}

function getArtist(userId, artistName) {
    return User.findOne({ user_id: userId }).then((user) => {
        if (user) {
            const foundArtist = _.find(user.artists, (a) => a.name === artistName);
            return _.get(foundArtist, 'spotify_id', null);
        } else {
            return null;
        }
    });
}

function getArtists(userId) {
    return User.findOne({ user_id: userId }).then((user) => {
        if (user) {
            return user.artists.map((a) => a.name);
        } else {
            return [];
        }
    });
}
 
module.exports = {
    addArtist: addArtist,
    removeArtist: removeArtist,
    getArtists: getArtists,
    getArtist: getArtist,
    getUsersSubscribedToArtist: getUsersSubscribedToArtist
};
