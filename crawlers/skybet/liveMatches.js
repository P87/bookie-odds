/**
 * Get the source code for the page containing a list of live games and
 * add the source to our queue.
 */

var projectConfig = require('../../config/project');
var skybetConfig = require('../../config/skybet');
var queueDriver = require('../../utils/queue/' + projectConfig.queueDriver);
var request = require('request');

var LiveMatches = {
    crawl: function() {
        request(
            {
                uri: skybetConfig.liveUrl
            },
            function(error, response, body) {
                log.info(skybetConfig.liveUrl + ' scraped. Adding to queue');
                queueDriver.save('sourceQueue', JSON.stringify({site: 'skybet', content: body}));
            }
        );
    }
}
module.exports = LiveMatches;
