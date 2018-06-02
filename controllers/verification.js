module.exports = (req, res) => {
    const hubChallenge = req.query['hub.challenge'];
    const hubMode = req.query['hub.mode'];
    const verifyTokenMatches = (req.query['hub.verify_token'] === 'jarvis');
    if (hubMode && verifyTokenMatches) {
        console.log('Sucessfully verified as webhook');
        res.status(200).send(hubChallenge);
    } else {
        console.error('Error attempting to verify as webhook');
        res.status(403).end();
    }
};