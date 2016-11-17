/**
 * Get the source code for a live match and add it to our queue
 */

var projectConfig = require('../../config/project');
var skybetConfig = require('../../config/skybet');
var queueDriver = require('../../utils/queue/' + projectConfig.queueDriver);
var request = require('request');

var Match = {
    crawl: function(url, callback) {
        request(
            {
                uri: skybetConfig.baseUrl + url
            },
            function(error, response, body) {
                if (error) {
                    log.error('Error requesting ' + skybetConfig.baseUrl + url);
                }
                log.info(skybetConfig.baseUrl + url + ' scraped. Adding to queue');
                queueDriver.save(
                    'matchSourceQueue',
                    JSON.stringify({
                        site: 'skybet',
                        content: body
                    }),
                    function() {
                        callback();
                    }
                );
            }
        );
    }
}

module.exports = Match;
