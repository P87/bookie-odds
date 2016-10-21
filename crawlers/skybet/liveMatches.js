/**
 * Get the source code for the page containing a list of live games and
 * add the source to our queue.
 */

var phantom = require('phantom');
var projectConfig = require('../../config/project');
var skybetConfig = require('../../config/skybet');
var queueDriver = require('../../utils/queue/' + projectConfig.queueDriver);

var LiveMatches = {
    crawl: function() {
        phantom.create().then(function(ph) {
            ph.createPage().then(function(page) {
                page.open(skybetConfig.liveUrl).then(function(status) {
                    if(status !== "success") {
                        throw 'Error retrieving live games on SkyBet, with status: ' + status;
                    }

                    page.property('content').then(function(content) {
                        log.info(skybetConfig.liveUrl + ' scraped. Adding to queue...');
                        queueDriver.save('sourceQueue', JSON.stringify({site: 'skybet', content: content}));
                        page.close();
                        ph.exit();
                    });
                });
            });
        });
    }
}
module.exports = LiveMatches;
