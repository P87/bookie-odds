var request = require('request');
var projectConfig = require('../../config/project');
var skybetConfig = require('../../config/skybet');
var dataDriver = require('../../utils/data/' + projectConfig.saver);

var Match = {
    crawl: function(url) {
        request({
        	uri: skybetConfig.baseUrl + url,
        }, function(error, response, body) {
        	if (error) {
        		throw 'Error retrieving live match on SkyBet: ' + error;
        	}
            log.info(skybetConfig.baseUrl + url + ' scraped. Adding to queue');
            dataDriver.save(
        		'matchSourceQueue',
        		JSON.stringify({
        			site: 'skybet',
        			content: body
        		})
        	);
        });
    }
}

module.exports = Match;
