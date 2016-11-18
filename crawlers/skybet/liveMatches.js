/**
 * Get the source code for the page containing a list of live games and
 * add the source to our queue.
 */

var projectConfig = require('../../config/project.json');
var skybetConfig = require('../../config/skybet.json');
var queueDriver = require('../../utils/queue/' + projectConfig.queueDriver);
var parser = require('../../parsers/skybet/liveMatches');
var request = require('request');

var LiveMatches = {
    crawl: function() {
        request(
            {
                uri: skybetConfig.liveUrl
            },
            function(error, response, body) {
                log.info(skybetConfig.liveUrl + ' scraped. Adding to queue');

                var matches = parser.getMatches(body);

                matches.forEach(function(match) {
                    queueDriver.save(
                        'matchQueue',
                        JSON.stringify({
                            site: 'skybet',
                            match: match
                        })
                    );
                });
            }
        );
    }
}
module.exports = LiveMatches;
