var MongoClient = require('mongodb').MongoClient;
var mongoConfig = require('../../config/mongo.json');

var Mongo = {
    /**
     * Store the collected information about to match to our mongo database.
     *
     * @param  {string} teams Home Team v Away Team
     * @param  {object} score The score of the game eg {home: 1, away: 2}
     * @param  {object} stats The stats for the game, possession etc.
     * @param  {function} callback
     */
    saveMatchInfo: function(matchData, callback) {
        MongoClient.connect(mongoConfig.server, function(err, db) {
            if (err) {
                throw 'Error connecting to mongo: ' + err;
            }
            log.info("Connected successfully to server");
            var collection = db.collection('games');

            collection.insertOne(matchData);
            db.close();

            return callback();
        });
    }
}

module.exports = Mongo;
