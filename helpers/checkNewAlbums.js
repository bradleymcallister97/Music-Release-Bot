const { getAllArtitsts } = require('../dao/artists');
const { searchAlbums } = require('../dao/spotify');
const { getUsersSubscribedToArtist } = require('../dao/user');
const { sendMessageToUser } = require('../dao/facebook');

function messageUsersForArtist(artistId, artistName, albumName) {
    getUsersSubscribedToArtist(artistId).then((userIds) => {
        userIds.forEach((id) => {
            console.log('Sending ' + id + ' message that ' + artistName + ' released ' + albumName);
            sendMessageToUser(id, artistName + ' has released a new album called ' + albumName);
        });
    });
}

module.exports = () => {
    var today = new Date();
    // Set time to midnight of today
    today.setHours(0,0,0,0);
    today = today.getTime();

    getAllArtitsts().then((artists) => {
        artists.forEach((artist) => {
            searchAlbums(artist.id).then((albums) => {
                albums.forEach((a) => {
                    if (a.dateReleased.getTime() === today) {
                        console.log(artist.id + ' released ' + a.name + ' on ' + new Date());
                        messageUsersForArtist(artist.id, artist.name, a.name);
                    }
                });
            });
        });
    });
}
