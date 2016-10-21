var projectConfig = require('../../config/project');
var skybetConfig = require('../../config/skybet');
var queueDriver = require('../../utils/queue/' + projectConfig.queueDriver);

var Match = {
    crawl: function(url, callback) {
        var phantom = require('phantom');
        var sitepage = null;
        var phInstance = null;
        phantom.create()
            .then(instance => {
                phInstance = instance;
                return instance.createPage();
            })
            .then(page => {
                sitepage = page;
                return page.open(skybetConfig.baseUrl + url);
            })
            .then(status => {
                console.log(status);
                return sitepage.property('content');
            })
            .then(content => {
                log.info(skybetConfig.baseUrl + url + ' scraped. Adding to queue');
                queueDriver.save(
            		'matchSourceQueue',
            		JSON.stringify({
            			site: 'skybet',
            			content: content
            		}),
                    function() {
                        sitepage.close();
                        phInstance.exit();
                        callback();
                    }
            	);

            })
            .catch(error => {
                console.log(error);
                phInstance.exit();
            });
    }
}

module.exports = Match;
