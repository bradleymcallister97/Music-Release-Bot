const rp = require('request-promise');
const _ = require('lodash');
const querystring = require('querystring');
const config = require('../config');

function searchArtists(query) {
    console.log('SPOTIFY: search artist: ' + query);
    const queryStr = querystring.stringify({
        type: 'artist',
        limit: 3,
        q: query
    });
    const url = '/search?' + queryStr;
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
    console.log('SPOTIFY: search albums ' + artistId);
    const queryStr = querystring.stringify({
        limit: 3
    });
    const url = '/artists/' + artistId + '/albums?' + queryStr;
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
                    dateReleased: new Date(a.release_date)
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
