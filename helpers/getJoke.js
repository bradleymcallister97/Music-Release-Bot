const rp = require('request-promise');

module.exports = () => {
    return rp({
        method: 'GET',
        uri: 'https://icanhazdadjoke.com/',
        json: true
    }).then((data) => {
        return data.joke;
    }).catch((error) => {
        return 'Sorry could not get a joke, try again';
    });
}
