require('./setupDB.js');
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

const run = () => {
    var today = new Date();
    console.log('Running job on ' + today);
    // Set time to midnight of today
    today.setUTCHours(0,0,0,0);

    return getAllArtitsts().then((artists) => {
        const promises = [];
        for (const artist of artists) {
            promises.push( 
                searchAlbums(artist.id).then((albums) => {
                    for (const a of albums) {
                        if (a.dateReleased.getTime() === today.getTime()) {
                            console.log(artist.id + ' released ' + a.name + ' on ' + today);
                            return messageUsersForArtist(artist.id, artist.name, a.name);
                        }
                    };
                })
            );
        };
        return Promise.all(promises);
    });
}

run().then(() => {
    console.log('Done!');
    process.exit(0);
}).catch((err) => {
    console.log('Error: ', err);
    process.exit(-1);
})
