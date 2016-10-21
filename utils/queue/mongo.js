var MongoClient = require('mongodb').MongoClient;
var mongoConfig = require('../../config/mongo');

var Mongo = {
    save: function(queue, data, callback) {
        MongoClient.connect(mongoConfig.server, function(err, db) {
            if (err) {
                throw 'Error connecting to mongo: ' + err;
            }
            log.info("Connected successfully to mongo queue");
            var collection = db.collection(mongoConfig[queue]);
            collection.insert(data);
            db.close();
            log.info('Added to queue: ' + mongoConfig[queue]);
            if (typeof callback == 'function')
                return callback();
        });
    },

    get: function(queue, callback) {
        MongoClient.connect(mongoConfig.server, function(err, db) {
            if (err) {
                throw 'Error connecting to mongo: ' + err;
            }
            log.info("Connected successfully to mongo queue");
            var collection = db.collection(mongoConfig[queue]);
            var record = collection.find({}).sort({_id: -1}).limit(1);
            log.info('Retrieved item from queue: ' + mongoConfig[queue]);
            callback(record, this)
        });
    }
}

module.exports = Mongo;
