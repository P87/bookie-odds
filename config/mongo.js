var Config = {
    server: 'mongodb://localhost:27017/bookie-odds',
    sourceQueue: 'liveGames', // Name of queue storing html of live games pages
    matchQueue: 'matchUrls', // Name of queue storing urls to live games
    matchSourceQueue: 'matchSource'

}

module.exports = Config;