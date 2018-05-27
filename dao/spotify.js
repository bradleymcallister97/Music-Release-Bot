const rp = require('request-promise');
const _ = require('lodash');
const config = require('../config');

function searchArtists(query) {
    const url = '/search?&type=artist&limit=3&q=' + encodeURIComponent(query);
    return rp({
        uri: config.spotify.url + url,
        headers: {
            Authorization: 'Bearer ' + config.spotify.token
        },
        method: 'GET',
        json: true
    }).then((data) => {
        const artists = _.get(data, 'artists.items', []);
        return artists.map((a) => {
            if (a.name && a.id) {
                return {
                    name: a.name,
                    id: a.id
                }
            }
        });
    }).catch((error) => {
        if (error.statusCode === 401) {
            console.error('Spotify token expired');
        }
    });
}

function searchAlbums(artistId) {
    const url = '/artists/' + artistId + '/albums?limit=3';
    return rp({
        uri: config.spotify.url + url,
        headers: {
            Authorization: 'Bearer ' + config.spotify.token
        },
        method: 'GET',
        json: true
    }).then((data) => {
        const albums = _.get(data, 'items', []);
        return albums.map((a) => {
            if (a.name && a.release_date) {
                return {
                    name: a.name,
                    dateReleased: a.release_date
                }
            }
        });
    }).catch((error) => {
        if (error.statusCode === 401) {
            console.error('Spotify token expired');
        }
    });
}

module.exports = {
    searchAlbums: searchAlbums,
    searchArtists: searchArtists
}
