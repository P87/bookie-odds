/**
 * Get a url for a live game out of the queue and crawl it.
 */

var projectConfig = require('../config/project');
var queueDriver = require('../utils/queue/' + projectConfig.queueDriver);

var Match = {
    run: function() {
        queueDriver.get('matchQueue', function(msg, ch) {
            var data = JSON.parse(msg.content.toString());
            var crawler = require('../crawlers/' + data.site + '/match');
            log.debug('Attempting to crawl ' + data.match);
            crawler.crawl(data.match, function() {
                ch.ack(msg);
            });
        });
    }
}

module.exports = Match;
