/**
 * Get a url for a live game out of the queue and crawl it.
 */

var projectConfig = require('../config/project');
var dataDriver = require('../utils/data/' + projectConfig.saver);

var Match = {
    run: function() {
        dataDriver.get('matchQueue', function(msg, ch) {
            var data = JSON.parse(msg.content.toString());
            var crawler = require('../crawlers/' + data.site + '/match');
            crawler.crawl(data.match, function() {
                ch.ack(msg);
            });
        });
    }
}

module.exports = Match;
